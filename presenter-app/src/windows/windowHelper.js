import {createProtocol} from "vue-cli-plugin-electron-builder/lib";
let protocolCreated = false;

export default () => {
  if(!protocolCreated)
    createProtocol("plodo");

  protocolCreated = true;
};
