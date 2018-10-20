class CalculatorFromString {
  constructor() {
    this.exp = {
      main: /^(-*\d*\.?\d*)(\+|-|\*|\/)(-*\d*\.?\d*)/,
      priority: /(\-|\+)?(\d*\.?\d*)+(\*|\/)(-*\d*\.?\d*)/g,
      unwrap: /(\([^(]*?\))/g,
      while: /(\d+)(\+|-|\*|\/)/,
      bracketClining: /\(|\)/g
    };
    this.log = {};
  }

  oneIteration() {
    if (--this.iterLimit === 0) {
      throw new Error("Something went wrong/string too long");
    }
  }

  unwrap() {
    const match = str.match(this.exp.unwrap);
    match.map(item => {
      let exp = item.replace(this.exp.bracketClining, "");
      this.curStr = this.curStr.replace(
        item,
        `${this.expressionToNumber(exp)}`
      );
    });
    if (str.includes("(")) {
      this.unwrap();
    }
    return this;
  }

  chunkParser(chunk) {
    const arr = chunk.replace(/^\+/, "").split(this.exp.main);
    [arr[1], arr[3]] = [Number(arr[1]), Number(arr[3])];
    switch (arr[2]) {
      case "/":
        return arr[1] / arr[3];
      case "+":
        return arr[1] + arr[3];
      case "-":
        return arr[1] - arr[3];
      case "*":
        return arr[1] * arr[3];
    }
  }

  clearString() {
    this.curStr = this.curStr
      .replace(/\s*/g, "")
      .replace("+-", "-")
      .replace("++", "+")
      .replace("--", "+")
      .replace("  ", "")
      .replace(/^\+/, "");
    return this;
  }

  unwrap() {
    const match = this.curStr.match(this.exp.unwrap);

    if (!match) {
      return this;
    }

    match.map(item => {
      let chunk = item.replace(this.exp.bracketClining, "");
      this.curStr = this.curStr.replace(
        item,
        `${this.expressionToNumber(chunk)}`
      );
    });

    if (this.curStr.includes("(")) {
      this.unwrap(this.curStr);
      this.oneIteration();
    }
    return this;
  }

  prioritySetter() {
    const check = this.curStr.match(this.exp.priority);
    if (check) {
      check.map(item => {
        let result = this.chunkParser(item);
        if (String(result)[0].match("[0-9]")) {
          result = "+" + result;
        }
        this.curStr = this.curStr.replace(item, `${result}`);
      });
    }
    return this;
  }

  expressionToNumber(chunkString) {
    let result = chunkString;
    while (result.match(this.exp.while)) {
      let splited = result.split(this.exp.main);
      let parse = splited[1] + splited[2] + splited[3];
      result = result.replace(parse, this.chunkParser(parse));
      this.oneIteration();
    }
    return result;
  }

  get curStr() {
    return this._curStr;
  }

  set curStr(value) {
    this.log.push(value);
    this._curStr = value;
  }

  calculate(str) {
    [this._curStr, this.orgStr] = [str];
    this.log = [];
    this.iterLimit = 1000;
    return this.clearString()
      .unwrap()
      .clearString()
      .prioritySetter()
      .clearString()
      .expressionToNumber(this.curStr);
  }
}
