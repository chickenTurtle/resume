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

const commands = {
  help: {
    fn: (args) => {
      return `
      Supported commands: foo
        - foo [args]: Echoes 'bar' and the arguments.
        - sleep: Waits for 5 seconds, then returns with a message.`;
    },
  },
  sleep: {
    fn: (args) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("done!");
        }, 5000);
      });
    },
    isAsync: true,
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
