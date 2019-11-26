const express = require("express");
const app = express();
app.use(express.json());
var path = require("path")

app.use(express.urlencoded());

app.get("/api", (req, res) => {
    res.sendFile(path.join(__dirname + "/form.html"));
});

app.post("/api", (req, res) => {
    var expression = req.body.strings
    let isMatchingBrackets = function (str) {
        let stack = [];
        let bracket = {
            '(': ')',
            '[': ']',
            '{': '}'
        }
        for (let i = 0; i < str.length; i++) {
            // If character is an opening brace add it to a stack
            if (str[i] === '(' || str[i] === '{' || str[i] === '[' ) {
                stack.push(str[i]);
            }
            //  If that character is a closing brace, pop from the stack, which will also reduce the length of the stack each time a closing bracket is encountered.
            else {
                let last = stack.pop();
                //If the popped element from the stack, which is the last opening brace doesn’t match the corresponding closing brace in the bracket, then return false
                if (str[i] !== bracket[last]) {return res.send(false)};
            }
        }
        // By the completion of the for loop after checking all the brackets of the str, at the end, if the stack is not empty then fail
            if (stack.length !== 0) {return res.send(false)};
        return res.send(true);
    }
    console.log(isMatchingBrackets(expression));
});

app.listen(4001, () => {
    console.log("app listening at 4001");
});
