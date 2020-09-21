import React, { useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone = props => {

  const {
    getRootProps,
    acceptedFiles,
    isDragActive,
  } = useDropzone();

  useEffect(() => {
    if (acceptedFiles.length === 1) {
      props.onSelectFile(acceptedFiles[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedFiles, acceptedFiles.length]);

  const activeStyle = {
    borderRadius: '1rem',
    background: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)'
  }

  const style = useMemo(() => ({
    ...(isDragActive ? activeStyle : {}),
  }), [activeStyle, isDragActive]);

  return (
    <div {...getRootProps({ className: props.className, style })}>
      {acceptedFiles.length === 1 ? <div style={{color: '#2a7c99'}}>{acceptedFiles[0].name}</div>: "Drop your file here" }
    </div>
  )
}

export default Dropzone;