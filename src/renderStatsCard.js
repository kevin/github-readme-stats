const { kFormatter, isValidHexColor } = require("../src/utils");
const getStyles = require("./getStyles");

const renderStatsCard = (stats = {}, options = { hide: [] }) => {
  const {
    name,
    totalStars,
    totalCommits,
    totalIssues,
    totalPRs,
    contributedTo,
    rank,
  } = stats;
  const {
    hide = [],
    show_icons = false,
    hide_border = false,
    hide_rank = false,
    line_height = 25,
    title_color,
    icon_color,
    text_color,
    bg_color,
  } = options;

  const lheight = parseInt(line_height);

  const titleColor =
    (isValidHexColor(title_color) && `#${title_color}`) || "#2f80ed";
  const iconColor =
    (isValidHexColor(icon_color) && `#${icon_color}`) || "#4c71f2";
  const textColor = (isValidHexColor(text_color) && `#${text_color}`) || "#333";
  const bgColor = (isValidHexColor(bg_color) && `#${bg_color}`) || "#FFFEFE";

  const STATS = {
    stars: {
      icon: "★",
      label: "Total Stars",
      value: totalStars,
      id: "stars",
    },
    commits: {
      icon: "🕗",
      label: "Total Commits",
      value: totalCommits,
      id: "commits",
    },
    prs: {
      icon: "🔀",
      label: "Total PRs",
      value: totalPRs,
      id: "prs",
    },
    issues: {
      icon: "ⓘ",
      label: "Total Issues",
      value: totalIssues,
      id: "issues",
    },
    contribs: {
      icon: "📕",
      label: "Contributed to",
      value: contributedTo,
      id: "contribs",
    },
  };

  /*const statItems = Object.keys(STATS)
    .filter((key) => !hide.includes(key))
    .map((key, index) =>
      // create the text nodes, and pass index so that we can calculate the line spacing
      //createTextNode({ ...STATS[key], index, lineHeight: lheight })
    );*/

  // Calculate the card height depending on how many items there are
  // but if rank circle is visible clamp the minimum height to `150`
  const height = /*Math.max(
    45 + (statItems.length + 1) * lheight,
    hide_rank ? 0 : 150
  );*/400;

  const border = `
    <rect 
      data-testid="card-border"
      x="0.5"
      y="0.5"
      width="494"
      height="99%"
      rx="4.5"
      fill="${bgColor}"
      stroke="#E4E2E2"
    />
  `;

  const styles = getStyles({
    titleColor,
    textColor,
    iconColor,
    show_icons,
  });

  /*return `
    <svg width="495" height="${height}" viewBox="0 0 495 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        ${styles}
      </style>
      
      ${hide_border ? "" : border}
      
      <text x="25" y="35" class="header">${name}'s GitHub Stats</text>

      <svg x="0" y="45">
        ${statItems.toString().replace(/\,/gm, "")}
      </svg>
    </svg>
  `;*/

  return `
    <svg width="495" height="${height}" viewBox="0 0 495 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        ${styles}
      </style>
      
      ${hide_border ? "" : border}
      
      <text x="25" y="35" class="header">${name}'s GitHub Stats</text>

      <svg x="0" y="45">
        test
      </svg>
    </svg>
  `;

};

module.exports = renderStatsCard;
