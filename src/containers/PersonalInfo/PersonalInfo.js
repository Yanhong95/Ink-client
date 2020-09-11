import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import classes from './PersonalInfo.module.scss';
import Aux from '../../higherOrderComponent/Aux/Aux';
import portrait from '../../assets/images/portrait.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub, faInstagram, faFacebookSquare, faHtml5 } from '@fortawesome/free-brands-svg-icons'
// import leetcode from '../../assets/images/leetcode.svg';

const PersonalInfo = props => {
  return (
    <Aux>
      <div className={classes.info}>
        <section className={classes.info_summary}>
          <figure class={classes.info_summary_figure}>
            <p class={classes.info_summary_figure_text}>Graduate student majoring in information systems at Northeastern University with 2 years of experience
              using <b>React</b> and <b>NodeJS</b> to reach project goals and ship high quality software. I’m highly driven and have strong
              experience creating scalable, high-quality web applications, also have strong algorithm and problem-solving skills.</p>
          </figure>
        </section>
        <section className={classes.info_skills}>
          <figure className={classes.info_skills_figure}>
            <div className={classes.info_skills_figure_title}>Programming Languages:</div>
            <div className={classes.info_skills_figure_content}>JavaScript, Java, HTML, CSS, Sass, Python, GraphQL, SQL</div>
            <div className={classes.info_skills_figure_title}>Frameworks:</div>
            <div className={classes.info_skills_figure_content}>React, Express, Spring, Bootstrap</div>
            <div className={classes.info_skills_figure_title}>Database:</div>
            <div className={classes.info_skills_figure_content}>MongoDB, MySQL, SQL Server, Redis, Elasticsearch</div>
            <div className={classes.info_skills_figure_title}>ORM:</div>
            <div className={classes.info_skills_figure_content}>Mongoose, Sequelize, Hibernate</div>
          </figure>
        </section>
        <section className={classes.info_education}>
          <figure className={classes.info_education_figure}>
            <div className={classes.info_education_figure_major}><b>Master of Science in Information Systems</b></div>
            <div className={classes.info_education_figure_school}><b>Northeastern University, Boston, MA</b></div>
            <div className={classes.info_education_figure_graduateTime}>Dec. 2020</div>
            <div className={classes.info_education_figure_courses}>Courses: Program Structure and Algorithms, Web Design and User Experience Engineering, Web Development
Tools and Methods, Data Management and Database Design, etc.</div>
            <div className={classes.info_education_figure_major}><b>Bachelor of Engineering in Computer Science</b></div>
            <div className={classes.info_education_figure_school}><b>Wuhan Technology and Business University, Wuhan, China</b></div>
            <div className={classes.info_education_figure_graduateTime}>Jun. 2016</div>
            <div className={classes.info_education_figure_courses}>Courses: Programming in C, Java Web Application Development, Operation System, etc.</div>
          </figure>
        </section>
        <section className={classes.info_workExperience}>
          <figure className={classes.info_workExperience_figure}>
            <div className={classes.info_workExperience_figure_exp}>
              <div className={classes.info_workExperience_figure_exp_position}><b><a href="https://www.knovva.com/">Knovva Academy</a></b> -  Full Stack Developer (Intern)</div>
              <div className={classes.info_workExperience_figure_exp_location}>June 2019 – Dec 2019 | Boston, MA</div><br />
              <div className={classes.info_workExperience_figure_exp_content}>As a pioneering academic institution designed to cultivate youth leaders. Knovva Academy organizes Model G20
              Youth Leadership Summit worldwide to improve leadership and international vision of young students. I was responsible for adding exciting new features to summit application
              platform using React and Redux. Also, developed API by Node/Express and GraphQL layer in between.</div><br />
              <h5>Developed WeChat login feature for user platform independently, including setting up development and test environments, designing and implementing user login logic</h5>
              <h5>Achieved 1.9x performance boost for application overview component by optimizing Mongoose model structure. Fetched thousands of application information across 7 collections on MongoDB.</h5>
              <h5>Rebuilt interview evaluation page, leveraged React Google Charts API to create user distribution chart, countdown page for student interview deadline, used TestCafe to write automatic tests,
                worked on website guided tours to improve user experience, created Easter eggs for birthday users, etc.</h5>
              <h5>Cooperated with UI/UX designer to iterate new version of web interface with flat design.</h5>
            </div>
            <hr />
            <div className={classes.info_workExperience_figure_exp}>
              <div className={classes.info_workExperience_figure_exp_position}><b><a href="https://us.hikvision.com/en">Hikvision Digital Technology Co.</a></b> - Technical Support Engineering (Intern)</div>
              <div className={classes.info_workExperience_figure_exp_location}>May. 2018 - Aug. 2018 | Guangzhou, China</div><br />
              <h5>Conducted installation and customer training of the IVMS-8700 Integrated Security Management Platform.</h5>
              <h5>Hard disk matrix troubleshooting and maintenance for Ping An Bank Guangzhou Branch.</h5>
              <h5>Debugged and tested monitoring products for the bidding of monitoring equipment of China Agricultural Bank Guangzhou Branch.</h5>
              <h5>Assisted the assembly and commissioning of intelligent IoT community China Construction Bank Guangzhou Branch.</h5>
            </div>
          </figure>
        </section>
        <section className={classes.info_ProjectExperience}>
          <figure className={classes.info_ProjectExperience_figure}>
          </figure>
        </section>
        <section className={classes.info_aboutMe}>
          <figure className={classes.info_aboutMe_figure}>
            <div className={classes.info_aboutMe_figure_image}><img src={portrait} alt="Portrait"></img></div>
            <div className={classes.info_aboutMe_figure_info}>
              <div className={classes.info_aboutMe_figure_info_name}><h2>Yanhong Chen</h2></div>
              <div className={classes.info_aboutMe_figure_info_details}>
                <div className={classes.info_aboutMe_figure_info_details_title}>Address:</div>
                <div className={classes.info_aboutMe_figure_info_details_content}>71 Sylvester Ave, Winchester, MA</div>
                <div className={classes.info_aboutMe_figure_info_details_title}>Zip Code:</div>
                <div className={classes.info_aboutMe_figure_info_details_content}>01890</div>
                <div className={classes.info_aboutMe_figure_info_details_title}>Email:</div>
                <div className={classes.info_aboutMe_figure_info_details_content}><a href="mailto: Yanhongmain@gmail.com">Yanhongmain@gmail.com</a></div>
                <div className={classes.info_aboutMe_figure_info_details_title}>Phone:</div>
                <div className={classes.info_aboutMe_figure_info_details_content}>857-869-6243</div>
                <div className={classes.info_aboutMe_figure_info_details_title}>Interests</div>
                <div className={classes.info_aboutMe_figure_info_details_content}>Photograph, Cooking, Music</div>
                <div className={classes.info_aboutMe_figure_info_details_resume}>
                  <button className={classes.info_aboutMe_figure_info_details_resume_bouncy} href="desumeDownload">Resume Download</button>
                </div>
              </div>
            </div>
          </figure>
        </section>
        <section className={classes.info_followMe}>
          <figure className={classes.info_followMe_figure}>
            <div className={classes.info_followMe_figure_icon} alt="LinkedIn"><a href="https://www.linkedin.com/in/yanhong-chen/"><FontAwesomeIcon icon={faLinkedin} size="4x" /></a></div>
            <div className={classes.info_followMe_figure_icon} alt="Github"><a href="https://github.com/Yanhong95"><FontAwesomeIcon icon={faGithub} size="4x" /></a></div>
            <div className={classes.info_followMe_figure_icon} alt="Instagram"><a href="https://www.instagram.com/chuckle___/"><FontAwesomeIcon icon={faInstagram} size="4x" /></a></div>
            <div className={classes.info_followMe_figure_icon} alt="Facebook"><a href="https://www.facebook.com/yanhongchen95"><FontAwesomeIcon icon={faFacebookSquare} size="4x" /></a></div>
            {/* <div className={classes.info_followMe_figure_icon} alt="Facebook"><a href="https://leetcode.com/yanhongchen/"><img src={leetcode} alt="leetcode"></img></a></div> */}
          </figure>
        </section>
      </div>
    </Aux>
  )
}

export default PersonalInfo;