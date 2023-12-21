/* eslint-disable @typescript-eslint/no-explicit-any */
// debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

import axios from 'axios'

type MsgType = 'text' | 'markdown'

interface Parmas {
  msgtype: MsgType
  markdown?: {
    content: string
    mentioned_mobile_list?: string[]
  }
  text?: {
    content: string
    mentioned_mobile_list?: string[]
  }
}



const sendMsgToWeChat = async (botKey: string, props: Parmas): Promise<void> => {
    try {
      const res = await axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        url: `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${botKey}`,
        data: props
      })

      const { data, status } = res || {}
      const { errcode } = data || {}


      console.log(`data: ${JSON.stringify(props)}`)
      console.log(`res.data: ${JSON.stringify(data)}`)
      console.log(`res.status: ${status}`)

      console.log(`res.data.errcode: ${errcode}`)
      
      if (errcode) {
        console.error(JSON.stringify(data))
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message)
    }
  }


const getKey = (key: string) => {
  return key.replace(/^-+/gi, '');
}

async function run(): Promise<void> {
  try {

    const args = process.argv.reduce((obj, str) => {
      const [key, value] = str.split('=')
      if (key && value) {
        obj[getKey(key)] = value
      }
      return obj
    }, {} as any)

    const { key, content, msgtype = 'text', mentionedMobileList: mentioned } = args
    const mentionedMobileList: string[] = (mentioned || '').split(',')

    console.log(`key: ${key}`)
    console.log(`content: ${content}`)
    console.log(`msgtype: ${msgtype}`)
    console.log(`mentionedMobileList: ${mentionedMobileList}`)

    const props: Parmas = {
        msgtype,
    }

    if (msgtype === 'text') {
        props.text = {
            content,
        }

      if (mentionedMobileList.length) {
        props.text.mentioned_mobile_list = mentionedMobileList
      }

    } else if (msgtype === 'markdown') {
      props.markdown = {
          content,
      }
      if (mentionedMobileList.length) {
        props.markdown.mentioned_mobile_list = mentionedMobileList
      }
    }
   
    await sendMsgToWeChat(key, props)
    

  } catch (error) {
    if (error instanceof Error) console.error(error.message)
  }
}

run()


/**
 * node ./dist/index.js --key=xxx --content=xxx --msgtype=xxx --mentionedMobileList=xxx
 */