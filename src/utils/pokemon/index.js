export const getStatColor = (stat) => {
  switch (stat) {
    case "hp":
      return "#66bb6a";
    case "attack":
      return "#e57373";
    case "defense":
      return "#4fc3f7";
    case "special-attack":
      return "#f06292";
    case "special-defense":
      return "#7e57c2";
    case "speed":
      return "#ffcc80";
    default:
      return "#4fc3f7";
  }
};
