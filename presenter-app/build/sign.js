exports.default = async function(configuration) {
    
  const login = process.env.KV_LOGIN;
  const password = process.env.KV_PASSWORD;
  const url = process.env.KV_URL;
  const keyname = process.env.KV_KEYNAME;

  const {IS_LOCAL_DEV} = require("./buildTools");
  if(IS_LOCAL_DEV) {
    console.log("Local build; skipping signing...");
    return;
  }

  require("child_process").execSync(
    `AzureSignTool.exe sign -kvu ${url} -kvi ${login} -kvs ${password} -kvc ${keyname} -tr http://timestamp.digicert.com -v "${configuration.path}"`,
    {
      stdio: "inherit"
    }
  );
};