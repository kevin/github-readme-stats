const { isValidHexColor } = require("./utils");
const getStyles = require("./getStyles");

function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
}

const createTextNode = ({ label, value, id, index, lineHeight }) => {
  const kValue = kFormatter(value);
  const staggerDelay = (index + 3) * 150;
  // manually calculating lineHeight based on index instead of using <tspan dy="" />
  // to fix firefox layout bug
  const lheight = lineHeight * (index + 1);
  return `
    <text class="stagger" style="animation-delay: ${staggerDelay}ms" x="25" y="${lheight}">
      <tspan dx="0" class="stat bold">
       ${label}:
      </tspan>
      <tspan x="160" data-testid="${id}" class="stat">${kValue}</tspan>
    </text>
  `;
};

const renderTerminal = (info = {}, options = { languages: [] }) => {
  const {
    name,
    message,
    repo
  } = info;
  const {
    languages = [],
    hide_border = false,
    line_height = 25,
    title_color,
    text_color,
    bg_color,
  } = options;

  const lheight = parseInt(line_height);

  const titleColor =
    (isValidHexColor(title_color) && `#${title_color}`) || "#333";
  const textColor = (isValidHexColor(text_color) && `#${text_color}`) || "#333";
  const bgColor = (isValidHexColor(bg_color) && `#${bg_color}`) || "#000";

  const INFO = {
    latest: {
      label: "Latest activity: ",
      value: message + ' in ' + repo,
      id: "latestpush",
    }
  };

  const infoItems = Object.keys(INFO)
    .map((key, index) =>
      // create the text nodes, and pass index so that we can calculate the line spacing
      createTextNode({ ...INFO[key], index, lineHeight: lheight })
    );

  // Calculate the card height depending on how many items there are
  // but if rank circle is visible clamp the minimum height to `150`
  const height = 400;

  const border = `
    <rect 
      data-testid="card-border"
      x="0.5"
      y="0.5"
      width="851"
      height="99%"
      rx="4.5"
      fill="${bgColor}"
      stroke="#2f80ed"
    />
  `;

  const styles = getStyles({
    titleColor,
    textColor
  });

  return `
    <svg width="852" height="${height}" viewBox="0 0 852 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        ${styles}
      </style>
      
      ${hide_border ? "" : border}
      
      <text x="25" y="35" class="text">${name}@github</text>
      
    </svg>
  `;

};

module.exports = renderTerminal;
