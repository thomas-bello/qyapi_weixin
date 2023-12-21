"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
// debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const sendMsgToWeChat = (botKey, props) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield (0, axios_1.default)({
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            url: `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${botKey}`,
            data: props
        });
        const { data, status } = res || {};
        const { errcode } = data || {};
        console.log(`data: ${JSON.stringify(props)}`);
        console.log(`res.data: ${JSON.stringify(data)}`);
        console.log(`res.status: ${status}`);
        console.log(`res.data.errcode: ${errcode}`);
        if (errcode) {
            console.error(JSON.stringify(data));
        }
    }
    catch (error) {
        if (error instanceof Error)
            console.error(error.message);
    }
});
const getKey = (key) => {
    return key.replace(/^-+/gi, '');
};
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const args = process.argv.reduce((obj, str) => {
                const [key, value] = str.split('=');
                if (key && value) {
                    obj[getKey(key)] = value;
                }
                return obj;
            }, {});
            const { key, content, msgtype = 'text', mentionedMobileList: mentioned } = args;
            const mentionedMobileList = (mentioned || '').split(',');
            console.log(`key: ${key}`);
            console.log(`content: ${content}`);
            console.log(`msgtype: ${msgtype}`);
            console.log(`mentionedMobileList: ${mentionedMobileList}`);
            const props = {
                msgtype,
            };
            if (msgtype === 'text') {
                props.text = {
                    content,
                };
                if (mentionedMobileList.length) {
                    props.text.mentioned_mobile_list = mentionedMobileList;
                }
            }
            else if (msgtype === 'markdown') {
                props.markdown = {
                    content,
                };
                if (mentionedMobileList.length) {
                    props.markdown.mentioned_mobile_list = mentionedMobileList;
                }
            }
            yield sendMsgToWeChat(key, props);
        }
        catch (error) {
            if (error instanceof Error)
                console.error(error.message);
        }
    });
}
run();
/**
 * node ./dist/index.js --key=xxx --content=xxx --msgtype=xxx --mentionedMobileList=xxx
 * node ./dist/index.js --key=4980ddad-d251-489f-8b18-78ac4439faba --content=xxx
 */ 
