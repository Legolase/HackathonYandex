function Translator(mdName, htmlName, ) {
    this.mdName = mdName;
    this.htmlName = htmlName;
}
const mdToHtmlModifierList = [
    new Translator("__", "span class=\"crossed\""),
    new Translator("**", "em"),
    new Translator("*", "strong"),
    new Translator("_", "span class=\"underline\"")
];
const mdToHtmlTrList = [
    new Translator("<", "&lt;"),
    new Translator(">", "&gt;")
];
function getIndex(arr, value, equality) {
    for (let i = 0; i < arr.length; ++i) {
        if (equality(value, arr[i])) {
            return i;
        }
    }
    return -1;
}
function simpleTranslate(str, trList) {
    let result = "";
    for (let i = 0; i < str.length; ++i) {
        let type = getIndex(trList, str.slice(i), (strr, pattern) => strr.startsWith(pattern));
        if (type === -1)
            result += str[i];
        else
            result += trList[type].htmlName;
    }
    return result;
}
function modifierTranslate(str, modifierList, rawMode = false) {
    const codeStart = "<code>";
    const codeEnd = "</code>";
    let stack = [""];
    let inCodeSection = false; // uses only if rawMode on
    const add = function(line) {
        if (typeof (stack[stack.length - 1]) === "string")
            stack[stack.length - 1] += line;
        else
            stack.push(line);
    }
    for (let i = 0; i < str.length; ++i) {
        if (!rawMode) {
            if (inCodeSection && str.slice(i).startsWith(codeEnd)) {
                add(codeEnd.slice(0, codeEnd.length - 1));
                i += codeEnd.length - 1;
                inCodeSection = false;
            } else if (!inCodeSection && str.slice(i).startsWith(codeStart)) {
                add(codeStart.slice(0, codeStart.length - 1));
                i += codeStart.length - 1;
                inCodeSection = true;
            }
            if (inCodeSection) {
                add(str[i]);
                continue;
            }
        }
        let type = getIndex(modifierList, str.slice(i), (a, b) => a.startsWith(b.mdName));
        if (type === -1) {
            add(str[i]);
            continue;
        }
        let stackId = getIndex(stack, type, (a, b) => typeof (b) === "number" && a === b);
        if (stackId === -1) {
            stack.push(type);
        } else {
            let buffer;
            buffer = "</" + modifierList[type].htmlName.split(' ')[0] + ">";
            for (let j = stack.length - 1; j > stackId; --j) {
                if (typeof (stack[j]) === "string")
                    buffer = stack[j] + buffer;
                else
                    buffer = modifierList[stack[j]].mdName + buffer;
                stack.pop();
            }
            buffer = "<" + modifierList[type].htmlName + ">" + buffer;
            stack[stack.length - 1] = buffer;
        }
        i += modifierList[type].mdName.length - 1;
    }
    let result = "";
    for (let i = 0; i < stack.length; ++i) {
        if (typeof (stack[i]) === "string")
            result += stack[i];
        else
            result += modifierList[stack[i]].mdName;
    }
    return result;
}
function mdToHtml(str) {
    if (typeof(str) !== "string")
        return "";
    str = simpleTranslate(str, mdToHtmlTrList);
    str = modifierTranslate(str, [
        new Translator("`", "code")
    ], true);
    return modifierTranslate(str, mdToHtmlModifierList);
}
const testList = {
    "noChange1": function () {
        let input = "heheh wfeljfwj cmskdc";
        return mdToHtml(input) === input;
    },
    "noChange2": function () {
        let input = "efij efij__";
        return mdToHtml(input) === input;
    },
    "noChange3": function () {
        let input = "efi**j efij__";
        return mdToHtml(input) === input;
    },
    "noChange4": function () {
        let input = "`efi**j efij__";
        return mdToHtml(input) === input;
    },
    "noChange5": function () {
        let input = "`efi**j e*fi_j__";
        return mdToHtml(input) === input;
    },
    "crossCheck1": function () {
        let input = "`ef__i**j efij__";
        return mdToHtml(input) === "`ef<span class=\"crossed\">i**j efij</span>";
    },
    "crossCheck2": function () {
        let input = "__`efi**j efij__";
        return mdToHtml(input) === "<span class=\"crossed\">`efi**j efij</span>";
    },
    "crossCheck3": function () {
        let input = "__`efi**j__ efij__";
        return mdToHtml(input) === "<span class=\"crossed\">`efi**j</span> efij__";
    },
    "emCheck1": function () {
        let input = "**`efi**j e*fi_j__";
        return mdToHtml(input) === "<em>`efi</em>j e*fi_j__";
    },
    "emCheck2": function () {
        let input = "**`efi**j e****fi_j__";
        return mdToHtml(input) === "<em>`efi</em>j e<em></em>fi_j__";
    },
    "strongCheck1": function () {
        let input = "`efi* *j e*fi_j__";
        return mdToHtml(input) === "`efi<strong> </strong>j e*fi_j__";
    },
    "strongCheck2": function () {
        let input = "`efi* *j e**fi_j__";
        return mdToHtml(input) === "`efi<strong> </strong>j e**fi_j__";
    },
    "strongCheck3": function () {
        let input = "`efi* *j e*f*i_j__";
        return mdToHtml(input) === "`efi<strong> </strong>j e<strong>f</strong>i_j__";
    },
    "codeCheck1": function () {
        let input = "`efi*`*j e*fi_j__";
        return mdToHtml(input) === "<code>efi*</code><strong>j e</strong>fi_j__";
    },
    "codeCheck2": function () {
        let input = "`efi*`*j e`*fi_j__";
        return mdToHtml(input) === "<code>efi*</code><strong>j e`</strong>fi_j__";
    },
    "codeCheck3": function () {
        let input = "`*efi*`*j e`*fi_j__";
        return mdToHtml(input) === "<code>*efi*</code><strong>j e`</strong>fi_j__";
    },
    "mixedCheck1": function () {
        let input = "`efi*`*j e`*fi_j_``_";
        return mdToHtml(input) === "<code>efi*</code>*j e<code>*fi_j_</code>`_";
    },
    "mixedCheck2": function () {
        let input = "__**we*hwhef fwek rwer*fj fr`w ce`**_*`*jd*`___";
        return mdToHtml(input) === "<span class=\"crossed\"><em>we<strong>hwhef fwek rwer</strong>fj fr<code>w ce</code></em>_*<code>*jd*</code></span>_";
    }
}
// Run tests
for (let funcName of Object.keys(testList)) {
    if (testList[funcName]()) {
        console.log("Test[ %s ]\tPassed", funcName);
    } else {
        console.log("Test[ %s ]\tFailed", funcName);
    }
}
export { mdToHtml };
