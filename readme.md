# #A string calculator on JavaScript.

I failed the interview.
So I gave myself a second try.

```
    const calculator = new CalculatorFromString();
    [
        '+14-122*110',
        '-100/10+(2*(2+1+4))+53*94+1*16',
        '2+(2*(2+1+4))+122*110+(-1+2)+(77)',
        '2-2*2',
        '2-2*-2',
        '-2.5* - 4.22',
        '((1+1)+2)*5',
        '21+-22--21*3+10',
        '2+(2*(2+1+4))+122*110+(-1+2)+(77)',
        '-2+-2/0.5',
        '-  2  .  5  * - 4 .2  2',
        '(2+3)*2-1*30',
        '21+-22--21*3+10'

    ].forEach(string => {
        let evalValue = '';
        let calculatorValue = calculator.calculate(string);
        try {
            evalValue = eval(string);
        } catch (E) {
            evalValue = 'Eval could not parse: ' + E.message;
        }
        console.log('Case:', string);
        console.log('Answer:', calculatorValue);
        console.log('Expects:', evalValue);
        console.log('Log', calculator.log);
        if (evalValue == calculatorValue) {
            console.log('%c Passed ', 'background: #222; color: #bada55');
        }
    });

```
