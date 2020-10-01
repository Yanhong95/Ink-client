import React, { useCallback, useState, useRef, useEffect } from 'react';
import classes from './PersonalInfo.module.scss';
import Aux from '../../higherOrderComponent/Aux/Aux';
import portrait from '../../assets/images/portrait.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { axiosInstance }  from '../../shared/utility'
import { faLinkedin, faGithub, faInstagram, faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import { aboutMe, summary, skills, education, projectExperience, workExperience } from "../../assets/json/CYH_info.json";

const PersonalInfo = props => {

  const [isSending, setIsSending] = useState(false)
  const isMounted = useRef(true)

  // set isMounted to false when we unmount the component
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  const loadResume = useCallback(async () => {
    // don't send again while we are sending
    if (isSending) return
    // update state
    setIsSending(true)
    // send the actual request
    try {
      const response = await axiosInstance.get('/s3/getS3Resume',{"responseType": "blob" });
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', 'Resume_of_Yanhong_Chen.pdf'); 
      // document.body.appendChild(link);
      // link.click();
      const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      const pdfWindow = window.open();
      pdfWindow.location.href = url;       
    } catch (error) {
      console.log(error.message);
    }
    // once the request is sent, update state again
    if (isMounted.current) // only update if we are still mounted
      setIsSending(false)
  }, [isSending]) // update the callback if the state changes
 
  return (
    <Aux>
      <div className={classes.info}>
        <section className={classes.info_summary}>
          <figure className={classes.info_summary_figure}>
            <p className={classes.info_summary_figure_text}>{summary}</p>
          </figure>
        </section>
        <section className={classes.info_skills}>
          <figure className={classes.info_skills_figure}>
            {Object.entries(skills).map((keyValue, index) => {
              return (<Aux key={index}>
                <div className={classes.info_skills_figure_title}>{keyValue[0]}:</div>
                <div className={classes.info_skills_figure_content}>{keyValue[1]}</div>
              </Aux>);
            })}
          </figure>
        </section>
        <section className={classes.info_education}>
          <figure className={classes.info_education_figure}>
            {education.map(theEducation => {
              return (<Aux key={theEducation.schoolAndLocation}>
                <div className={classes.info_education_figure_major}><b>{theEducation.degree}</b></div>
                <div className={classes.info_education_figure_school}><b>{theEducation.schoolAndLocation}</b></div>
                <div className={classes.info_education_figure_graduateTime}>{theEducation.period}</div>
                <div className={classes.info_education_figure_courses}>{theEducation.courses}</div></Aux>)
            })}
          </figure>
        </section>
        <section className={classes.info_workExperience}>
          <figure className={classes.info_workExperience_figure}>
            {workExperience.map((theWorkExperience, index) => {
              const dutyList = theWorkExperience.hightLight.map((item, index) => <h5 key={index}>{item}</h5>)
              return (<Aux key={theWorkExperience.companyName} >
                <div className={classes.info_workExperience_figure_exp}>
                  <div className={classes.info_workExperience_figure_exp_position}><b><a href={theWorkExperience.companyURL}>{theWorkExperience.companyName}</a></b> -  {theWorkExperience.position}</div>
                  <div className={classes.info_workExperience_figure_exp_location}>{theWorkExperience.period} | {theWorkExperience.location}</div><br />
                  {theWorkExperience.duty ? <Aux><div className={classes.info_workExperience_figure_exp_content}>{theWorkExperience.duty}</div><br /></Aux> : null}
                  {dutyList}
                </div>
                {/* {index !== workExperience.length - 1 ? <hr /> : null} */}
              </Aux>)
            })}
          </figure>
        </section>
        <section className={classes.info_ProjectExperience}>
          <figure className={classes.info_ProjectExperience_figure}>
            {projectExperience.map((theProject, index) => {
              const contentList = theProject.content.map((item, index) => <h5 key={index}>{item}</h5>);
              return (<Aux key={index}>
                <div className={classes.info_ProjectExperience_figure_exp}>
                  <div className={classes.info_ProjectExperience_figure_exp_title}><b>{theProject.name}</b><p>{theProject.period}</p></div><br />
                  {contentList}
                </div>
              </Aux>);
            })}
          </figure>
        </section>
        <section className={classes.info_aboutMe}>
          <figure className={classes.info_aboutMe_figure}>
            <div className={classes.info_aboutMe_figure_image}><img src={portrait} alt="Portrait"></img></div>
            <div className={classes.info_aboutMe_figure_info}>
              <div className={classes.info_aboutMe_figure_info_name}><h2>{aboutMe.name}</h2></div>
              <div className={classes.info_aboutMe_figure_info_details}>
                <div className={classes.info_aboutMe_figure_info_details_title}>City:</div>
                <div className={classes.info_aboutMe_figure_info_details_content}>{aboutMe.city}</div>
                <div className={classes.info_aboutMe_figure_info_details_title}>Email:</div>
                <div className={classes.info_aboutMe_figure_info_details_content}>{aboutMe.email}</div>
                <div className={classes.info_aboutMe_figure_info_details_title}>Phone:</div>
                <div className={classes.info_aboutMe_figure_info_details_content}>{aboutMe.phone}</div>
                <div className={classes.info_aboutMe_figure_info_details_title}>Interests:</div>
                <div className={classes.info_aboutMe_figure_info_details_content}>{aboutMe.interests}</div>
                <div className={classes.info_aboutMe_figure_info_details_resume}>
                  <button className={classes.info_aboutMe_figure_info_details_resume_bouncy} onClick={loadResume} href="resumeDownload">Resume</button>
                </div>
              </div>
            </div>
          </figure>
        </section>
        <section className={classes.info_followMe}>
          <figure className={classes.info_followMe_figure}>
            <div className={classes.info_followMe_figure_icon} alt="LinkedIn"><a href={aboutMe.LinkedInURL}><FontAwesomeIcon icon={faLinkedin} size="4x" /></a></div>
            <div className={classes.info_followMe_figure_icon} alt="Github"><a href={aboutMe.GithubURL}><FontAwesomeIcon icon={faGithub} size="4x" /></a></div>
            <div className={classes.info_followMe_figure_icon} alt="Instagram"><a href={aboutMe.InstagramURL}><FontAwesomeIcon icon={faInstagram} size="4x" /></a></div>
            <div className={classes.info_followMe_figure_icon} alt="Facebook"><a href={aboutMe.FacebookURL}><FontAwesomeIcon icon={faFacebookSquare} size="4x" /></a></div>
            {/* <div className={classes.info_followMe_figure_icon} alt="Leetcode"><a href={}><img src={aboutMe.LeetcodeURL} alt="leetcode"></img></a></div> */}
          </figure>
        </section>
        <section className={classes.info_copyright}>
          <figure className={classes.info_copyright_figure}>
              <h5>© 2020 by Yanhong Chen. All rights reserved.</h5>
          </figure>
        </section>
      </div>
    </Aux >
  )
}

export default PersonalInfo;