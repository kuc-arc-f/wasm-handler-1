import { marked } from 'marked';

const resultText = "";
const sessionData = { userId: "u_123", sessionId: "s_123"}

const AgentUtil = {

  validAgent: function (message: string){
    let ret = false;

    if(message.indexOf("sheet-list-agent") >= 0){
      return true;
    }
    if(message.indexOf("tool-sample-agent") >= 0){
      return true;
    }

    return ret;
  },
  /*
  *
  * @param
  *
  * @return
  */
  validAgentName: function (message: string): string {
    let ret = null;
    //console.log("validAgentName.message=", message);

    if(message.indexOf("tool_sample_agent") >= 0){
      return "tool_sample_agent";
    }

    return ret;
  },

  /*
  *
  * @param
  *
  * @return
  */
  initialAgent: async function(inText: string, appName: string) {
    try{
      const nowStr = new Date().getTime();
      sessionData.sessionId = "sid_" + nowStr;
      const item = {
        appName: appName ,
        messages: inText ,
        userId : sessionData.userId , 
        sessionId: sessionData.sessionId, 
      };
      const body: any = JSON.stringify(item);
      const res = await fetch('/api/adk_init' , {
        method: 'POST',
        headers: {'Content-Type': 'application/json'} ,
        body: body
      });
      if(res.ok === false){
       throw new Error("res.OK = NG"); 
      };
    }catch(e){
      console.error(e);
      throw new Error('Error , initialAgent');
    }
  } , 

  /*
  *
  * @param
  *
  * @return
  */
  postAgent: async function(inText: string, appName: string) {
    try{
      const item = {
        appName: appName ,
        userId : sessionData.userId , 
        sessionId: sessionData.sessionId, 
        messages: inText,
      };
      const body: any = JSON.stringify(item);		
      const res = await fetch("/api/chat", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      if(res.ok === false){
       throw new Error("res.OK = NG"); 
      };
      const json = await res.json();
      console.log(json);
      
      return json
    }catch(e){
      console.error(e);
      throw new Error('Error , postAgent');
    }
  } ,

}

export default AgentUtil;
