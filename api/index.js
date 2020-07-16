const { renderError } = require("../src/utils");
const renderTerminal = require("../src/renderTerminal");

const request = require("request");

module.exports = async (req, res) => {
  const {
    username,
    languages,
    hide_border,
    line_height,
    title_color,
    icon_color,
    text_color,
    bg_color,
  } = req.query;
  let info;
  info.name = username;

  res.setHeader("Content-Type", "image/svg+xml");
  try {
    info = {name: "", message: "", repo: ""}
    await request({url: "https://api.github.com/users/" + username + "/events/public", headers: {"User-Agent": "request"}}, function(error, resp, body) {
      if (!error && resp.statusCode == 200) {

        var events = JSON.parse(body);
        var lastPushEvent;
        for (let i = 0; i < events.length; i++) {
          if (events[i].type === "PushEvent") {
            lastPushEvent = events[i];
            break;
          }
        }

        info.message = lastPushEvent.payload.commits[lastPushEvent.payload.commits.length - 1].message;
        info.repo = lastPushEvent.repo.name;

      }
    });
  } catch (err) {
    return res.send(renderError(err.message));
  }

  res.send(
    renderTerminal(info, {
      languages: JSON.parse(languages || "[]"),
      hide_border,
      line_height,
      title_color,
      icon_color,
      text_color,
      bg_color,
    })
  );

};
