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
    line_height = 25,
    color1,
    color2,
    color3,
    bg_color,
  } = options;

  const lheight = parseInt(line_height);

  const colorNormal = (isValidHexColor(color1) && `#${color1}`) || "#FFFFFF";
  const colorName =
    (isValidHexColor(color2) && `#${color2}`) || "#FFFFFF";
  const colorPrompt = (isValidHexColor(color3) && `#${color3}`) || "#FFFFFF";
  const bgColor = (isValidHexColor(bg_color) && `#${bg_color}`) || "#000000";

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

  /*const renderBorder = `
    <rect 
      data-testid="card-border"
      x="0.5"
      y="0.5"
      width="calc(100% - 1px)"
      height="calc(100% - 1px)"
      rx="4.5"
      fill="${bgColor}"
      stroke="${borderColor}"
    />
  `;*/

  const styles = getStyles(colorNormal, colorName, colorPrompt);

  return `
    <svg width="854" height="${height}" viewBox="0 0 854 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        ${styles}
      </style>
      
      <rect data-testid="card-border" x="0.5" y="0.5" width="100%" height="100%" rx="4.5" fill="${bgColor}"/>
      
      <text x="20" y="35" class="text"><tspan id="name">${name}</tspan>@github <tspan id="prompt">~ $</tspan></text>
      <svg x="0" y="45">
        ${infoItems.toString().replace(/\,/gm, "")}
      </svg>
    </svg>
  `;

};

module.exports = renderTerminal;
