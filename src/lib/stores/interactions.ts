// import { browser } from "$app/environment";

// import io, { Socket } from 'socket.io-client';
// import { afterNavigate, } from '$app/navigation';
// import { app_config } from "$lib/config";

// const toffee_log = `




//                                           ####                      #####               
//                                        #########                  ##########            
//                                      ########################################           
//                                      #########################################          
//                                      ########################################           
//                                       ######################################            
//                                      ########################################           
//                                     ##########################################          
//                                     ##################### #####################         
//                                    ###################       ##################         
//                                    #################  ####### #################         
//                                    ################ ########## ################         
//                                    ################   #######   ###############         
//                                    ###############              ###############         
//                                     ###############             ###############         
//                                     ################           ###############          
//                                     ###########################################         
//                                 ##################################################      
//                               #######################################################   
//                             ########################################################### 
//                            #############################################################
// #######################################################################################################################
// #######################################################################################################################

// #######  ######  ##      ######  ######  ######  ######    ######       ########  ######  ######  ###### ######  ######
// ##       ##  ##  ##      ##  ##  ##   #  ##  ##  ##    ##  ##  ##          ##     ##  ##  ##      ##     ##      ##
// #        ##  ##  ##      ##  ##  ######  ######  ##    ##  ##  ##          ##     ##  ##  #####   #####  ######  ######
// ##       ##  ##  ##      ##  ##  ####    ##  ##  ##    ##  ##  ##          ##     ##  ##  ##      ##     ##      ##
// #######  ######  ######  ######  ##  ##  ##  ##  ######    ######          ##     ######  ##      ##     ######  ######
        

    
// we're not currently hiring but we're always open to options, shoot us an email at info@coloradotoffee.com
//                 `

// export let socket: Socket | undefined;
// export let api_healthy = true;


// export let new_socket: Socket | undefined;
// export let new_api_healthy = true;


// export let backoff = 1;
// export async function mount_socket() {

//     await new Promise(r => setTimeout(r, backoff));
//     if (backoff < 1000) {
//         backoff += 100
//     } else {
//         backoff += 1000
//     }

//     if (browser) {

//         console.log(toffee_log);
//         if (new_socket == null && new_api_healthy == true) {
//             fetch(`${app_config.api_base}/aapii/session`).then(res => {
//                 console.log("AAPII/SESSION: ", res.status)
//                 if (res.status == 200) {
//                     console.log("API health check succeeded")
//                     new_socket = io(`${app_config.api_base}/session`);
//                     document.addEventListener('click', (event) => {
//                         let node = event.target;
//                         if (node instanceof Element) {
//                             if (node?.classList?.contains("trackable")) {
//                                 const interaction = {
//                                     t: "click",
//                                     d: {
//                                         target: node.id,
//                                     }
//                                 }
//                                 // console.log("Emitting", interaction);
//                                 new_socket?.emit('interaction', interaction);
//                             }
//                         }
//                     })
//                     new_api_healthy = true;
//                     new_socket?.emit('interaction', {
//                         t: "load",
//                         d: {
//                             location: location.pathname + location.search,
//                             user_agent: window.navigator.userAgent
//                         }
//                     })
//                 } else {
//                     new_api_healthy = false;
//                     console.error("API health check failed 1");
//                     mount_socket()
//                 }
//             })
//         }
//     }
// }
