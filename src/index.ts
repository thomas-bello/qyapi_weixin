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
      if (error instanceof Error) core.setFailed(error.message)
    }
  }

async function run(): Promise<void> {
  try {

    const content = process.argv[2]


    // const botKey: string = core.getInput('botKey')
    // const content: string = core.getInput('content') || ''

    // const msgtype = core.getInput('msgtype') as MsgType

    // const mentionedMobileList: string[] = (core.getInput('mentionedMobileList') || '').split(',')

  
    // console.log(`botKey: ${botKey}`)
    // console.log(`content: ${content}`)
    // console.log(`msgtype: ${msgtype}`)
    // console.log(`mentionedMobileList: ${mentionedMobileList}`)

    // const props: Parmas = {
    //     msgtype,
    // }

    // if (msgtype === 'text') {
    //     props.text = {
    //         content,
    //     }

    //   if (mentionedMobileList.length) {
    //     props.text.mentioned_mobile_list = mentionedMobileList
    //   }

    // } else if (msgtype === 'markdown') {
    //   props.markdown = {
    //       content,
    //   }
    //   if (mentionedMobileList.length) {
    //     props.markdown.mentioned_mobile_list = mentionedMobileList
    //   }
    // }
   
    // await sendMsgToWeChat(botKey, props)
    

  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
