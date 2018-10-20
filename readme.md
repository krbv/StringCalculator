# #A string calculator  on JavaScript.

I failed the interview.
So I gave myself a second try.


```
    const calculator = new CalculatorFromString();
    [
        
        '2+(2*(2+1+4))+122*110+(-1+2)+(77)',
        '-2+-2',
        '-2.5* - 4.22',
        '((1+1)+2)*5',
        '-  2  .  5  * - 4 .2  2',
        '(2+3)*2-1*30',
        '21+-22--21*3+10'

    ].forEach(string => {
        console.log('Answer:', calculator.calculate(string));
        console.log('Log', calculator.log);
    });
```	
