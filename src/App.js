import "./App.css";
import CommandLine from "./CommandLine";

const banner_text =
  "       __            _     __   ____                ___   _ ____\n" +
  "  ____/ /___ __   __(_)___/ /  / __/___  __________/ (_)_(_) __/\n" +
  " / __  / __ `/ | / / / __  /  / /_/ __ \\/ ___/ ___/ / __ \\/ /_  \n" +
  "/ /_/ / /_/ /| |/ / / /_/ /  / __/ /_/ / /  (__  ) / /_/ / __/  \n" +
  "\\__,_/\\__,_/ |___/_/\\__,_/  /_/  \\____/_/  /____/_/\\____/_/     \n" +
  "\n \u00A9 " +
  new Date().getFullYear();

const banner = {
  banner_text,
  banner_welcome: `Welcome!

  Type "help" for a list of commands.`,
};

const downloadFile = (uri, downloadName) => {
  const link = document.createElement("a");
  link.download = downloadName;
  link.href = uri;
  link.click();
  link.remove();
};

const bold = (text) => {
  return <span className="bold">{text}</span>;
};

const skills = () => {
  const skills = [
    ["C", 5],
    ["C++", 6],
    ["C# and .NET", 7],
    ["SQL", 8],
    ["Java", 7],
    ["Python", 9],
    ["Go", 5],
    ["Kubernetes", 6],
    ["Docker", 6],
    ["Fullstack web development", 8],
    ["React", 7],
    ["Vue/Angular", 6],
    ["Ada95", 3],
  ];

  return skills.map((skill, key) => {
    const red = skill[1] > 5 ? 255 - 255 * (skill[1] / 10) : 255;
    const green = skill[1] < 5 ? 255 * (skill[1] / 10) : 255;
    return (
      <div id={key}>
        <dt>{skill[0]}</dt>
        <dd>
          ##{" "}
          <span
            style={{
              color: `rgb(${red},${green},0)`,
              textShadow: "0 0 5px",
            }}
          >
            {"#".repeat(skill[1])}
          </span>
          <span
            dangerouslySetInnerHTML={{
              __html: "&nbsp;".repeat(10 - skill[1]),
            }}
          ></span>
          ##
        </dd>
      </div>
    );
  });
};

const commands = {
  help: {
    fn: (args) => {
      return (
        <div className="text-muted">
          Supported commands:
          <ul>
            <li>about</li>
            <li>clear</li>
            <li>contact</li>
            <li>download_cv</li>
            <li>projects</li>
            <li>repo</li>
            <li>skills</li>
          </ul>
        </div>
      );
    },
  },
  about: {
    fn: (args) => {
      return (
        <div className="text-muted">
          <p>Hey!</p>
          <br></br>
          <p>
            As you probably know my name is {bold("David Forslöf")}. I am 24
            years old with an engineering degree in Industrial Engineering and
            Management, with a B.Sc. in computer science. I am born and raised
            in Stockholm with a huge interest in motorsport.
          </p>
          <br></br>
          <p>
            I have always had a passion for computers and computer science, but
            it was not until I implemented an ERP system for Optimal Montage on
            my own that I realised how much I really enjoyed it. Having the
            possibility to study a B.Sc. in computer science only accelerated my
            interest in the field, while being able to leverage my knwoledge as
            a self-taught programmer to further increase my understanding of the
            field.
          </p>
        </div>
      );
    },
  },
  contact: {
    fn: (args) => {
      return (
        <div className="text-muted">
          <dl>
            <dt>Email</dt>
            <dd>
              <a href="mailto:forslof.d@gmail.com">forslof.d@gmail.com</a>
            </dd>
            <dt>LinkedIn</dt>
            <dd>
              <a
                target="_blank"
                href="https://linkedin.com/in/david-forslöf"
                rel="noreferrer"
              >
                linked.com/in/david-forslöf
              </a>
            </dd>
          </dl>
        </div>
      );
    },
  },
  download_cv: {
    fn: (args) => {
      downloadFile("CV.pdf", "CV David Forslöf 2022.pdf");
      return <span className="text-muted">Downloaded CV</span>;
    },
  },
  skills: {
    fn: (args) => {
      return <>{skills()}</>;
    },
  },
  projects: {
    fn: (args) => {
      return (
        <div className="text-muted">
          <span>Some of the projects I have developed are listed below:</span>
          <dl>
            <dt>
              LiUGrade -&nbsp;
              <a
                target="_blank"
                href="https://chrome.google.com/webstore/detail/liugrade/pjhgdnmkdpeddjgaoadfneadfmgljiel?hl=sv"
                rel="noreferrer"
              >
                (link to Google Chrome Webstore)
              </a>
            </dt>
            <dd>
              Google Chrome extension with ~600 active users. Lets users see
              their GPA and other stats about their courses on Ladok. Developed
              in React and Javascript.
            </dd>
            <dt>
              Landing page at Optimal Montage -&nbsp;
              <a
                target="_blank"
                href="https://optimalmontage.se"
                rel="noreferrer"
              >
                Link
              </a>
            </dt>
            <dd>
              Single side landing page developed with Hugo for maximum
              performance. Rated 96/100 on Google PageSpeed Insights.
            </dd>
            <dt>ERP System at Optimal Montage</dt>
            <dd>
              Tailor-made ERP system in ASP.NET, which is integrated with Google
              G Suite, accounting software and IKEA's proprietary ERP system.
            </dd>
            <dt>Database architect at Compular</dt>
            <dd>
              Implemented and set the architecture for a SQLite database. Built
              in the existing C++ codebase.
            </dd>
            <dt>
              This website! -&nbsp;
              <a
                target="_blank"
                href="https://github.com/chickenTurtle/resume"
                rel="noreferrer"
              >
                Link to Git
              </a>
            </dt>
            <dd>Developed in React.</dd>
          </dl>
        </div>
      );
    },
  },
  repo: {
    fn: (args) => {
      return (
        <div className="text-muted">
          The source-code for this project can be found on{" "}
          <a
            target="_blank"
            href="https://github.com/chickenTurtle/resume"
            rel="noreferrer"
          >
            github.com/chickenTurle/resume
          </a>
        </div>
      );
    },
  },
};

function App() {
  return (
    <div className="root">
      <div className="top-window">
        <div className="circle first"></div>
        <div className="circle second"></div>
        <div className="circle third"></div>
        <div className="text noselect">⌥⌘1</div>
        <div className="name noselect">david forslöf</div>
      </div>
      <CommandLine commands={commands} banner={banner} />
    </div>
  );
}

export default App;
