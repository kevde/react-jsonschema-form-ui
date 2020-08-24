import React, { useState } from 'react'
import Gallery from 'react-photo-gallery'

import {ReactDropZoneWidget} from '../../index'
import PhotoItem from './components/PhotoItem'

function readFile(file, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', (event) => {
    const { result } = event.target
    const img = new Image()
    img.src = result
    img.onload = function () {
      callback({ isLocal: true, src: result, file, width: img.width, height: img.height })
    }
  })
  reader.readAsDataURL(file)
}

function ReactPhotoGalleryField(props) {
  const { formData, onChange } = props
  const [isReading, setIsReading] = useState(false)

  const onAcceptedFiles = files => {
    setIsReading(true)
    const newFiles = []
    files.map(f => readFile(f, (p) => {
      newFiles.push(p)
      if (files.length === newFiles.length) {
        setIsReading(false)
        const newFormData = { ...formData }
        newFormData.attachments = [...newFormData.attachments || [], ...newFiles]
        onChange(newFormData)
      }
    }))
  }

  const onRemoveFile = index => {
    const newFormData = { ...formData }
    newFormData.attachments = newFormData.attachments.filter((item, i) => i !== index)
    onChange(newFormData)
  }

  const UploadComponent = props.uploadComponent || ReactDropZoneWidget;

  const attachments = formData.attachments || []
  const isDisabled = props.readonly || props.readOnly || props.disabled
  const isColumnLayout = attachments.length > 1

  const _renderPhoto = item => (
    <PhotoItem
      {...item}
      key={item.index}
      isColumn={isColumnLayout}
      onRemove={onRemoveFile}
    />
  )

  return (
    <div className="react-gallery">
      <h2>{props.schema.title}</h2>
      {!isDisabled && (
        <UploadComponent
          isReading={isReading}
          onAcceptedFiles={onAcceptedFiles}
          className={"d-print-none"}
        />
      )}
      <Gallery photos={attachments} renderImage={_renderPhoto} columns={2} direction={isColumnLayout ? "column" : "row"} />
    </div>
  )
}

export default ReactPhotoGalleryField