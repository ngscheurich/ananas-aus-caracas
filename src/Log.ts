class Log {
  private container: HTMLPreElement;

  constructor() {
    this.container = document.createElement("pre");
    this.container.style.margin = "0";
    this.container.style.backgroundColor = "#000";
    this.container.style.height = "48px";
    this.container.style.overflowY = "auto";
    this.container.style.color = "#eee";
    this.container.style.padding = "10px";
    this.container.style.lineHeight = "1.5";
    document.addEventListener("DOMContentLoaded", () => {
      const canvas = document.querySelector("canvas");
      this.container.style.width = `${canvas.width - 20}px`;
      canvas.parentNode.insertBefore(this.container, canvas.nextSibling);
      this.write("Welcome to Ananas aus Caracas!");
      this.write("⬆️⬇️⬅️➡️ to move. SPC or RET to search.");
      this.write("-- Good luck --");
    });
  }

  public write(msg: string) {
    const div: HTMLSpanElement = document.createElement("div");
    div.innerText = msg;
    this.container.appendChild(div);
    div.scrollIntoView();
  }
}

export default Log;
