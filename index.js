const currentUrl = new URL(window.location.href);
const board = Chessboard2("theGame", {
    draggable: true,
    position: currentUrl.searchParams.get("position") ?? "start",
});
const boards = [
    {
        name: "The Power Dome",
        imgFileName: "ThePowerDome.png",
        gameOffsetX: 10,
        gameOffsetY: 10,
        gameWidth: 10,
        gameHeight: 10,
    },
];

document.getElementById("theBoard").src =
    "./assets/boards/" + boards[0].imgFileName;

if (typeof navigator.share === "function") {
    document.getElementById("share").innerText = "Share Position";
    document.getElementById("share").onclick = () => {
        currentUrl.searchParams.set("position", board.fen());
        window.history.replaceState(null, "", currentUrl.toString());
        navigator.share({
            title: "Games On Friends",
            url: currentUrl.toString(),
        });
    };
} else {
    document.getElementById("share").onclick = () => {
        currentUrl.searchParams.set("position", board.fen());
        window.history.replaceState(null, "", currentUrl.toString());
        navigator.clipboard.writeText(currentUrl.toString());
    };
}

document.getElementById("menu").onclick = () => {
    board.start();
};
