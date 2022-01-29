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

const bold = (text) => {
  return <span className="bold">{text}</span>;
};

const skills = () => {
  const skills = [
    ["C", 5],
    ["C++", 6],
    ["C# and .NET", 7],
    ["SQL", 8],
    ["Java", 9],
    ["Python", 9],
    ["Go", 5],
    ["Fullstack web development", 8],
    ["Ada95", 3],
  ];

  return skills.map((skill, key) => {
    const red = skill[1] > 5 ? 255 - 255 * (skill[1] / 10) : 255;
    const green = skill[1] < 5 ? 255 * (skill[1] / 10) : 255;
    return (
      <div id={key}>
        <dt style={{ color: "gray" }}>{skill[0]}</dt>
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
            dangerouslySetInnerHTML={{ __html: "&nbsp;".repeat(10 - skill[1]) }}
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
        <>
          <div>
            Supported commands:
            <ul>
              <li>about</li>
              <li>clear</li>
              <li>contact</li>
              <li>download_cv</li>
              <li>skills</li>
              <li>repo</li>
            </ul>
          </div>
        </>
      );
    },
  },
  about: {
    fn: (args) => {
      return (
        <>
          <p>Hey!</p>
          <br></br>
          <p>
            As you probably know my name is {bold("David Forslöf")}. I am 24
            years old with an engineering degree in Industrial Engineering and
            Management, with a B.Sc. in computer science.
          </p>
        </>
      );
    },
  },
  contact: {
    fn: (args) => {
      return (
        <>
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
        </>
      );
    },
  },
  download_cv: {
    fn: (args) => {
      return "";
    },
  },
  skills: {
    fn: (args) => {
      return <dl>{skills()}</dl>;
    },
  },
  repo: {
    fn: (args) => {
      return (
        <>
          The source-code for this project can be found on{" "}
          <a
            target="_blank"
            href="https://github.com/chickenTurtle/resume"
            rel="noreferrer"
          >
            github.com/chickenTurle/resume
          </a>
        </>
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
