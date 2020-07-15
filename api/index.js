const { renderError } = require("../src/utils");
const renderStatsCard = require("../src/renderStatsCard");

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
  let stats;

  res.setHeader("Content-Type", "image/svg+xml");
  try {
    stats = {username};
  } catch (err) {
    return res.send(renderError(err.message));
  }

  res.send(
    renderStatsCard(stats, {
      languages: JSON.parse(languages || "[]"),
      show_icons,
      hide_border,
      hide_rank,
      line_height,
      title_color,
      icon_color,
      text_color,
      bg_color,
    })
  );
};
