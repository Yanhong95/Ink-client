import React, { useEffect, useState, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import classes from './Upload.module.scss';
import * as actions from '../../store/actions/index';
import Aux from '../../higherOrderComponent/Aux/Aux';
import Button from '../../components/UI/Button/Button';
import Loader from '../../components/UI/Loader/Loader';
import Dropzone from '../../components/UI/Dropzone/Dropzone';
import Modal from '../../components/UI/Modal/Modal';
import { axiosInstance, consoleHelper } from '../../shared/utility';

// 实现, 拖拽上传
// 点击名称可修改文件名但是不能修改后缀, 
// 只填category不填topic不行
// 显示上传文件名称并检查重复
// 没有选择topic和category不能上传,
// 上传完成后更新currentCatalogList.

const Upload = props => {

  const [fileName, setFileName] = useState('');
  const [error, setError] = useState(null);
  const [topics, setTopics] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [currentStructure, setCurrentStructure] = useState({ topic: null, subcategory: null, file: null });
  const [disable, setDisable] = useState({ disableTopic: true, disbaleSubcategory: true, submit: true });
  const [timeout, setTimeout] = useState(null);

  // load catalogs when render the component at firsttime.
  useEffect(() => {
    if (props.currentCatalog == null) {
      props.loadCatalog();
    } else {
      setTopics(props.currentCatalog.reduce((accumulator, currenValue) => accumulator.concat(currenValue.name), []));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentCatalog]);


  consoleHelper(props.currentCatalog);

  const didMountRef = useRef(false);
  const inputRef = useRef();
  useEffect(() => {
    if (didMountRef.current) {
      const timer = setTimeout(() => {
        if (fileName !== '' && fileName === inputRef.current.value) {
          const newFile = new File([currentStructure.file], fileName.toLowerCase() + '.md', { type: 'text/markdown; charset=utf-8' });
          setCurrentStructure({ ...currentStructure, file: newFile });
          if(error) setError(null);
        }
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    } else {
      didMountRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileName, inputRef, didMountRef]);

  const dropZomeSelectFile = (file) => {
    const fileName = file.name;
    const fileNameArray = fileName.split('.');
    const extention = fileNameArray[fileNameArray.length - 1];
    fileNameArray.pop();
    if (extention !== 'md') {
      setError('Please Select Markdown type file!');
    } else {
      const newFile = new File([file], file.name, { type: 'text/markdown; charset=utf-8' });
      const pureName = fileNameArray.join('.');
      setCurrentStructure({ ...currentStructure, file: newFile });
      setFileName(pureName);
      if(error) setError(null);
    }
  }

  const handleSelectFile = event => {
    if (event.target.files.length) {
      const fileName = event.target.files[0].name;
      const fileNameArray = fileName.split('.');
      const extention = fileNameArray[fileNameArray.length - 1];
      fileNameArray.pop();
      if (extention !== 'md') {
        setError('Please Select Markdown type file!');
      } else {
        const newFile = new File([event.target.files[0]], event.target.files[0].name, { type: 'text/markdown; charset=utf-8' });
        const pureName = fileNameArray.join('.');
        setCurrentStructure({ ...currentStructure, file: newFile });
        setFileName(pureName);
        if(error) setError(null);
      }
    }
  };

  const addNewTopic =  useCallback(event => {
    if (timeout) {
      clearTimeout(timeout);
    }
    let currTopic = event.target.value.trim();
    const timer = setTimeout(() => {
      if (!currentStructure.file) {
        setError("Please upload file first!");
        return;
      }
      if (currTopic === "") {
        setCurrentStructure({ ...currentStructure, topic: null, subcategory: null });
        setDisable({ ...disable, submit: false });
        if(error) setError(null);
        return;
      }
      const index = topics.map(topic => topic.toLowerCase()).indexOf(currTopic.toLowerCase());
      if (index > -1) {
        currTopic = topics[index];
        const filter = props.currentCatalog.filter(currentCatalog => currentCatalog.name.toLowerCase() === currTopic.toLowerCase())[0]
        if (filter) {
          setSubcategories(filter.subcategories.reduce((accumulator, currenValue) => accumulator.concat(currenValue.name), []));
        } 
      } else {
        setTopics([...topics, currTopic]);
      }
      if (currentStructure.topic !== currTopic) setCurrentStructure({ ...currentStructure, topic: currTopic });
      if(error) setError(null);
    }, 5000)
    setTimeout(timer);
  }, [currentStructure, disable, error, props.currentCatalog, timeout, topics]);

  const addNewSubcategory = useCallback(event => {
    if (timeout) {
      clearTimeout(timeout);
    }
    let currSubcategory = event.target.value.trim();
    const timer = setTimeout(() => {
      if (!currentStructure.topic) {
        setError("Please selectTopic first!");
        return;
      }
      if (currSubcategory === "") {
        setCurrentStructure({ ...currentStructure, subcategory: null });
        if(error) setError(null);
        setDisable({ ...disable, submit: false });
        return;
      };
      const index = subcategories.map(subcategory => subcategory.toLowerCase()).indexOf(currSubcategory.toLowerCase());
      if (index > -1) {
        currSubcategory = subcategories[index];
        const prevFilesInThisSubcategory = props.currentCatalog.filter(topic => topic.name === currentStructure.topic)[0].subcategories.filter(category => category.name === currSubcategory)[0].notes;
        if (prevFilesInThisSubcategory.filter(note => note.name.toLowerCase() === currentStructure.file.name.toLowerCase()).length !== 0) {
          setCurrentStructure({ ...currentStructure, subcategory: currSubcategory });
          setError('The file name already existed in this category, please update the file name or upload another file!');
          return;
        }
      }
      if (currentStructure.subcategory !== currSubcategory) {
        setCurrentStructure({ ...currentStructure, subcategory: currSubcategory });
      }
      if(error) setError(null);
    }, 1000);
    setTimeout(timer);
  }, [currentStructure, disable, error, props.currentCatalog, subcategories, timeout]);

  if (currentStructure.file && disable.disableTopic) {
    setDisable({ ...disable, disableTopic: false });
  } else if (currentStructure.topic && disable.disbaleSubcategory) {
    setDisable({ ...disable, disbaleSubcategory: false });
  } else if (currentStructure.subcategory && disable.submit && error === null) {
    setDisable({ ...disable, submit: false });
  }

  const handleUpload = async event => {
    event.preventDefault();
    if (!currentStructure.file || !currentStructure.subcategory || !currentStructure.topic) {
      setError(`The ${!currentStructure.file ? 'file' : !currentStructure.subcategory ? "category" : !currentStructure.topic ? 'topic' : null} field is empty!`);
      setDisable({ ...disable, submit: true });
      return;
    }
    props.uploadFile(currentStructure, props.token);
  };


  const uploadFinished = () => {
    props.loadCatalog();
    setCurrentStructure({ topic: null, subcategory: null, file: null });
    setDisable({ disableTopic: true, disbaleSubcategory: true, submit: true });
    setFileName('');
    if(error)setError(null);
  }


  const mainPage = (
    <div className={classes.upload_outer}>
      <div className={classes.upload}>
        <div className={classes.upload_title}>Upload</div>
        <div className={classes.upload_fileName}>
          <input className={classes.upload_fileName_input}
            defaultValue={fileName} type="text"
            ref={inputRef}
            onChange={event => setFileName(event.target.value)} />
        </div>
        <div className={classes.upload_dropFile}>
          <Dropzone className={classes.upload_dropFile_mainDrop} onSelectFile={dropZomeSelectFile} />
        </div>
        <div className={classes.upload_addFiled}>
          <input className={classes.upload_addFiled_input} onChange={handleSelectFile} id="fileupload" name="myfile" type="file" />
          <label htmlFor="fileupload">Choose a file</label>
        </div>
        <div className={classes.upload_category}>
            <div className={classes.upload_category_topic}>
              <input list="topicList" id="topics" name="topics"
                value={currentStructure.topic ? currentStructure.topic : ""}
                disabled={disable.disableTopic}
                onChange={addNewTopic} />
              <datalist id="topicList">
                {topics ? topics.map((topic, index) => <option key={index} value={topic} />) : null}
              </datalist>
            </div>
            <div className={classes.upload_category_subcategory}>
              <input list="subcategoryList" id="subcategory" name="subcategory"
                value={currentStructure.subcategory ? currentStructure.subcategory : ""}
                disabled={disable.disbaleSubcategory}
                onChange={addNewSubcategory} />
              <datalist id="subcategoryList">
                {subcategories ? subcategories.map((subcategory, index) => <option key={index} value={subcategory} />) : null}
              </datalist>
            </div>
        </div>
        <div className={classes.upload_status}>{
          error || props.error ? <p className={classes.upload_status_error}>{error || props.error}</p>
            : props.loading ? <Loader /> : <p className={classes.upload_status_success}>{props.message}</p>
        }
        </div>
        <div className={classes.upload_submit}>
          <Button disabled={disable.submit} clicked={handleUpload}>Submit</Button>
        </div>
      </div>
    </div>
  );

  let successPopup = (
    <Aux>
      <Modal show={props.message} position={{ top: 0, left: 0 }} modalClosed={uploadFinished}>
        <div >{props.message}</div>
      </Modal>
      {mainPage}
    </Aux>
  );

  return (
    props.message ? successPopup : mainPage
  )
}

const mapStateToProps = state => {
  return {
    loading: state.update.loading,
    error: state.update.error,
    currentCatalog: state.update.currentCatalog,
    token: state.auth.token,
    message: state.update.message,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCatalog: () => dispatch(actions.loadCatalog()),
    uploadFile: (currentStructure, token) => dispatch(actions.uploadFile(currentStructure, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload, axiosInstance);;
