import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classes from './Upload.module.scss';
import * as actions from '../../store/actions/index';
import Aux from '../../higherOrderComponent/Aux/Aux';
import Btn from '../../components/UI/Button/Button';
import Loader from '../../components/UI/Loader/Loader'
import Dropzone from '../../components/UI/Dropzone/Dropzone'


// 实现, 拖拽上传, 显示上传文件名称并检查重复, 没有选择topic和category不能上传, 选择后文件名重复不能上传.
// 点击名称可修改文件名但是不能修改后缀, 上传完成后更新currentCatalogList.
// 只填category不填topic不行

const Upload = props => {

  const [file, setFlie] = useState({ url: null, raw: null });
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState(null);
  const [topics, setTopics] = useState(null);
  const [subcategories, setSubcategories] = useState(null);
  const [currentStructure, SetCurrentStructure] = useState({ topic: null, subcategory: null, file: null });
  const [disbaleSubcategory, SetDisbaleSubcategory] = useState(true);

  // load catalogs when render the component at firsttime.
  useEffect(() => {
    if (props.currentCatalog == null) {
      props.loadCatalog();
    } else {
      setTopics(props.currentCatalog.reduce((accumulator, currenValue) => accumulator.concat(currenValue.name), []));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentCatalog]);

  // console.log(props.currentCatalog);

  const handleSelectFile = event => {
    console.log(event.target.files);
    if (event.target.files.length) {
      const fileName = event.target.files[0].name;
      const fileNameArray = fileName.split('.');
      const extention = fileNameArray[fileNameArray.length - 1];
      fileNameArray.pop();
      if (extention !== 'md') {
        setError('Please Select Markdown type file!');
      } else {
        setFlie({
          url: URL.createObjectURL(event.target.files[0]),
          raw: event.target.files[0]
        });
        setFileName(fileNameArray.join('.'));
        setError(null);
      }
    }
  };

  const dropZomeSelectFile = (file) => {
    const fileName = file.name;
    const fileNameArray = fileName.split('.');
    const extention = fileNameArray[fileNameArray.length - 1];
    fileNameArray.pop();
    if (extention !== 'md') {
      setError('Please Select Markdown type file!');
    } else{
      setFlie({
        url: URL.createObjectURL(file),
        raw: file
      });
      setFileName(fileNameArray.join('.'));
      setError(null);
    }
  }
  

  const handleFileName = event => {
     console.log(event.target.value);
  }

  const addNewTopic = event => {
    if (topics.includes(event.target.value.toLowerCase())) {
      setSubcategories(props.currentCatalog
        .filter(currentCatalog => currentCatalog.name === event.target.value.toLowerCase())[0]
        .subcategories.reduce((accumulator, currenValue) => accumulator.concat(currenValue.name), []));
    }
    SetCurrentStructure({ ...currentStructure, topic: event.target.value.toLowerCase() });
    SetDisbaleSubcategory(false);
  }

  const addNewsubcategory = event => {
    console.log(event.target.value);
  }

  // const handleUpload = async event => {
  //   event.preventDefault();
  //   console.log(file);
  //   const formData = new FormData();
  //   formData.append("", file.raw);

  //   await fetch("YOUR_URL", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "multipart/form-data"
  //     },
  //     body: formData
  //   });
  // };


  let categoryList = null;
  if (props.currentCatalog) {
    categoryList = (
      <Aux>
        <div className={classes.upload_category_topic}>
          <input list="topicList" id="topics" name="topics" onChange={addNewTopic} />
          <datalist id="topicList">
            {topics ? topics.map((topic, index) => <option key={index} value={topic.charAt(0).toUpperCase() + topic.slice(1)} />) : null}
          </datalist>
        </div>
        <div className={classes.upload_category_subcategory}>
          <input list="subcategoryList" id="subcategory" name="subcategory" disabled={disbaleSubcategory} onChange={addNewsubcategory} />
          <datalist id="subcategoryList">
            {subcategories ? subcategories.map((subcategory, index) => <option key={index} value={subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} />) : null}
          </datalist>
        </div>
      </Aux>)
  }



  return (
    <div className={classes.upload_outter}>
      <div className={classes.upload}>
        <div className={classes.upload_title}>Upload</div>
        <div className={classes.upload_fileName}>
          <input className={classes.upload_fileName_input} defaultValue={fileName} type="text" onChange={handleFileName} />
        </div>
        <div className={classes.upload_dropFile}>
          {/* <StyledDropZone className={classes.upload_dropFile_mainDrop} 
              onDrop={dropFile} >{file.raw ? file.raw.name : 'Click or drop your file here'}</StyledDropZone> */}
          <Dropzone className={classes.upload_dropFile_mainDrop} onSelectFile={dropZomeSelectFile} />
        </div>
        <div className={classes.upload_addFiled}>
          <input className={classes.upload_addFiled_input} onChange={handleSelectFile} id="fileupload" name="myfile" type="file" />
          <label htmlFor="fileupload">Choose a file</label>
        </div>
        <div className={classes.upload_category}>{categoryList}</div>
        <div className={classes.upload_status}>{
          error ? <p className={classes.upload_status_error}>{error}</p> : props.loading ? <Loader /> : null
        }
        </div>
        <div className={classes.upload_submit}>
          <Btn>Submit</Btn>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.update.loading,
    currentCatalog: state.update.currentCatalog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCatalog: () => dispatch(actions.loadCatalog()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
