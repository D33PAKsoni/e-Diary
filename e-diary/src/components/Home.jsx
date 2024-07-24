import React from "react";
import "../css/Home.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Accordion from "react-bootstrap/Accordion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <HomeNav />
      <Hero />
      <Features />
      <About />
      <Footer />
    </div>
  );
};

const HomeNav = () => {
  return (
    <div className="nav-container">
      <Navbar expand="lg" className="nav">
        <Container>
          <div className="brand">
            <Navbar.Brand href="#home">
              <img
                alt="E-Diary Logo"
                src="./src/assets/notebook.webp"
                width="60"
                height="60"
                className="d-inline-block align-top"
              />
              <span>e-Diary</span>
            </Navbar.Brand>
          </div>
          <div className="links">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#hero">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#about">About Us</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

const Hero = () => {
  const [places] = useTypewriter({
    words: ["Schools", "Colleges", "Institutes", "Tuitions"],
    loop: {},
    typeSpeed: 120,
    deleteSpeed: 50,
  });

  return (
    <div className="hero-container" id="hero">
      <div className="hero">
        <div className="title-desc">
          <h1 className="title">Revolutionizing Communication for</h1>{" "}
          <h2>
            {places}
            <Cursor />
          </h2>
          <p className="desc">
            e-Diary is the digital alternative to traditional school diaries,
            improving communication between parents, teachers, and students
          </p>
          <div className="button">
            <Link to="/login">
              <div className="button-link">
                <h4>Get Started</h4>
              </div>
            </Link>
          </div>
        </div>
        <div className="hero-img">
          <div className="anim-img">
            <img src="./src/assets/smartphone.webp" />
          </div>
          <div className="anim-img2">
            <img src="./src/assets/diary.webp" />
          </div>
          <img src="./src/assets/teacher.webp" />
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div className="features-container" id="features">
      <div className="features">
        <div className="features-head">
          <h2>Key Features</h2>
          <h3>Streamline School Communication</h3>
          <p>
            e-Diary provides a centralized platform for parents, teachers, and
            students to stay connected and informed.
          </p>
        </div>
        <div className="features-cards">
          <div className="card2">
            <img src="./src/assets/access.webp"></img>

            <div>
              <div>
                <h3>Enhanced Accessibility</h3>
              </div>
              <div>
                <p>
                  e-Diary gives access to academic schedules, assignments, and
                  important announcements from any location, promoting
                  convenience for students, parents, and teachers.
                </p>
              </div>
            </div>
          </div>

          <div className="card2">
            <img src="./src/assets/chat.webp"></img>

            <div>
              <div>
                <h3>Improved Communication</h3>
              </div>
              <div>
                <p>
                  e-Diary facilitate seamless communication between parents,
                  teachers, and students, fostering a collaborative and
                  supportive educational environment.
                </p>
              </div>
            </div>
          </div>

          <div className="card2">
            <img src="./src/assets/cloud.webp"></img>

            <div>
              <div>
                <h3>Streamlined Data</h3>
              </div>
              <div>
                <p>
                  e-Diary offer efficient organization of academic materials,
                  reducing the risk of misplaced or lost physical documents.
                </p>
              </div>
            </div>
          </div>

          <div className="card2">
            <img src="./src/assets/eco-bag.webp"></img>

            <div>
              <div>
                <h3>Eco-Friendly Solution</h3>
              </div>
              <div>
                <p>
                  By eliminating the need for paper diaries, digitization
                  contributes to environmental sustainability and reduces paper
                  waste.
                </p>
              </div>
            </div>
          </div>

          <div className="card2">
            <img src="./src/assets/login.webp"></img>

            <div>
              <div>
                <h3>Data Security</h3>
              </div>
              <div>
                <p>
                  e-Diary can provide secure storage of sensitive academic
                  information, ensuring that student records and communications
                  are protected from unauthorized access.
                </p>
              </div>
            </div>
          </div>

          <div className="card2">
            <img src="./src/assets/time.webp"></img>

            <div>
              <div>
                <h3>Instant Updates</h3>
              </div>
              <div>
                <p>
                  e-Diary provides real-time updates on your child's progress,
                  attendance, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="about-container" id="about">
      <div className="about">
        <h2>About Us</h2>
        <p>Meet the people behind e-Diary</p>
        <div className="persons">
          <div className="person" id="person1">
            <div className="float1"></div>
            <div className="float2"></div>
            <img src="./src/assets/dev2.webp"></img>

            <h4>Deepak Kumar Soni</h4>

            <h5>Role</h5>
            <span>Web Developer</span>

            <h5 className="hidden">Background</h5>
            <span className="hidden">
              Deepak Soni is a dedicated student currently pursuing his studies
              at IGNOU. With a passion for web development, he took the
              initiative to create the e-Diary platform.
            </span>

            <h5 className="hidden">Contribution</h5>
            <span className="hidden">
              Deepak played a crucial role in designing and implementing various
              features of e-Diary, ensuring a seamless user experience.
            </span>
          </div>

          <div className="person" id="person2">
            <div className="float1"></div>
            <div className="float2"></div>
            <img src="./src/assets/teach.webp"></img>

            <h4>Dr. Ritu Rana</h4>

            <h5>Role</h5>
            <span>Guide and Mentor</span>

            <h5 className="hidden">Background</h5>
            <span className="hidden">
              Dr. Ritu Rana is an esteemed faculty member at Shri Vishwakarma
              Skill University. Her expertise lies in web and network
              technologies.
            </span>

            <h5 className="hidden">Contribution</h5>
            <span className="hidden">
              Dr. Rana provided valuable insights, guidance, and mentorship
              throughout the development process. Her expertise helped shape
              e-Diary into what it is today.
            </span>
          </div>
        </div>
        <span>
          At e-Diary, we believe in creating a digital space where users can
          express their thoughts, feelings, and experiences. Our goal is to
          provide a user-friendly platform that encourages creativity,
          reflection, and personal growth.
        </span>
      </div>
    </div>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer-container">
      <footer>
        <div className="footer">
          <div>
            <div className="footer-brand">
              <h1>
                <img
                  alt="E-Diary Logo"
                  src="./src/assets/notebook.webp"
                  width="60"
                  height="60"
                  className="d-inline-block align-top"
                />
                e-Diary
              </h1>
              <p>
                e-Diary is a digital platform that revolutionizes school
                communication, empowering parents, teachers, and students to
                stay connected and informed.
              </p>
            </div>
            <div className="footer-links">
              <a href="#popup1">
                <i className="fa-regular fa-circle-question"></i> FAQ
              </a>
              <a href="#popup2">
                <i className="fa-solid fa-id-card"></i> Contact Info
              </a>
            </div>
          </div>
          <p>
            &copy; <span>{currentYear} e-Diary. </span> All rights reserved.
          </p>
        </div>
      </footer>
      <div className="overlay" id="popup1">
        <div className="popup">
          <h2>Frequently Asked Questions</h2>
          <a className="close" href="#footer">
            &times;
          </a>
          <div className="content">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  How can I access my class schedule and homework assignments?
                </Accordion.Header>
                <Accordion.Body>
                  As a student, you can access your class schedule and homework
                  assignments through the E-Diary platform from anywhere. The
                  system will provide you with a personalized view of your
                  academic schedule and assignments.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  Can I submit my homework assignments digitally?
                </Accordion.Header>
                <Accordion.Body>
                  Yes, the E-Diary system allows you to submit your homework and
                  assignments digitally. This reduces the risk of losing
                  physical copies and enables you to receive timely feedback
                  from your teachers.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  Will I receive notifications about upcoming tests and events?
                </Accordion.Header>
                <Accordion.Body>
                  Absolutely. The E-Diary system will send you notifications
                  about upcoming tests, events, and important deadlines,
                  ensuring that you stay informed and prepared.{" "}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  How can I, teacher, post homework assignments and class
                  materials for my students?
                </Accordion.Header>
                <Accordion.Body>
                  As a teacher, you can post homework assignments, class
                  materials, and resources for your students to access through
                  the E-Diary platform. The system will ensure that the
                  assignments and materials are delivered to the intended
                  students or classes.{" "}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  Can I communicate with parents about student progress and
                  behavior?
                </Accordion.Header>
                <Accordion.Body>
                  Communication module will be integrated in future updates. You
                  can use the messaging module to communicate with parents about
                  their child's academic performance, behavior, and any
                  concerns.{" "}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <Accordion.Header>
                  How can I manage attendance for my classes?
                </Accordion.Header>
                <Accordion.Body>
                  The attendance tracking module in the E-Diary system allows
                  you to record student attendance digitally for your classes.
                  You can also generate attendance reports to analyze student
                  attendance patterns and trends.{" "}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="6">
                <Accordion.Header>
                  Will I receive notifications about school events and important
                  announcements?
                </Accordion.Header>
                <Accordion.Body>
                  Yes, the E-Diary system will send you notifications about
                  school events, holidays, and important announcements, ensuring
                  that you stay up-to-date with the latest information from the
                  school.{" "}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
      <div className="overlay" id="popup2">
        <div className="popup">
          <h2>Contact Us</h2>

          <a className="close" href="#footer">
            &times;
          </a>
          <div className="content">
            <p>
              Feel free to reach out to us with any questions, feedback, or
              suggestions. We value your input and are committed to improving
              e-Diary based on your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
