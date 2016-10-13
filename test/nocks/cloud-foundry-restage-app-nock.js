const crypto = require("crypto")
const nock = require("nock")

const mockRestageAppRequest = (guid, environment) => {
  nock("https://api.example.com", {
      reqheaders: {
        "authorization": /Bearer .+/
      }
    })
    .post(`/v2/apps/${guid}/restage`)
    .reply(201, {
      metadata: {
        guid: guid,
        url: `/v2/apps/${guid}`
      },
      entity: {
        name: crypto.randomBytes(6).toString("hex"),
        docker_image: "example.com:5000/builder/1",
        environment_json: environment,
      },
    })
}

module.exports = mockRestageAppRequest