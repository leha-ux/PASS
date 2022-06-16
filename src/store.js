import Vue from 'vue'
import Vuex from 'vuex'
import { getField, updateField } from 'vuex-map-fields';

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
  connections: [],
  nodes: [],

  },
  getters: { getField, 


  getNode: 
  (state) => (id) => {
    return state.nodes.find(node => node.id === id)
  },

  getSBD: 
  (state) => (findID) => {
    let returnNode = null 
    state.nodes.forEach(node => {
        if(node.SBD.connections.find(elem => elem.id === findID)){
          returnNode =  node
        }
    })
    return returnNode
  },
  getOutgoingMessages : 
  (state) => (startID, endID) => {
    return state.connections.filter(element => element.destination.id === endID && element.source.id === startID).map(element => element.messages).flat(1)
  },
  getIncomingMessages : 
  (state) => (startID, endID) => {
    return state.connections.filter(element => element.destination.id === startID && element.source.id === endID).map(element => element.messages).flat(1)
  }
  },
  mutations: { updateField,
    initialiseStore(state) {
			// Check if the ID exists
			if(sessionStorage.getItem('store')) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(state, JSON.parse(sessionStorage.getItem('store')))
				);
			}
		},
set_all(state, jsonFile){
state.connections = jsonFile["connections"]
state.nodes = jsonFile["nodes"]
},
set_connections(state, payload){
var indexHelp = state.nodes.map(i => i.id).indexOf(payload["id"])
state.nodes[indexHelp].SBD.connections = payload["connections"]
},

set_nodes(state, payload){
  var indexHelp = state.nodes.map(i => i.id).indexOf(payload["id"])
  state.nodes[indexHelp].SBD.nodes = payload["nodes"]
  },

  reset_msg(state, payload){
    let indexNode = state.nodes.findIndex(element => element.id === payload["nodeID"])
    let connectionSBDID = state.nodes[indexNode].SBD.connections.findIndex(element => element.id === payload["connectionSBDID"])
    if(state.nodes[indexNode].SBD.connections[connectionSBDID].source.type === "receive"){
      state.nodes[indexNode].SBD.connections[connectionSBDID].receiveMsg = ""
    } else if(state.nodes[indexNode].SBD.connections[connectionSBDID].source.type === "send"){
      state.nodes[indexNode].SBD.connections[connectionSBDID].sendMsg = ""
    }
  },
  set_from_to(state, payload){
    let indexNode = state.nodes.findIndex(element => element.id === payload["nodeID"])
    let connectionSBDID = state.nodes[indexNode].SBD.connections.findIndex(element => element.id === payload["connectionSBDID"])
    if(state.nodes[indexNode].SBD.connections[connectionSBDID].source.type === "receive"){
      state.nodes[indexNode].SBD.connections[connectionSBDID].receiveFrom = payload["receive"]
    } else if(state.nodes[indexNode].SBD.connections[connectionSBDID].source.type === "send"){
      state.nodes[indexNode].SBD.connections[connectionSBDID].sendTo = payload["send"]
    }
  },

  },
  })
export default store;
