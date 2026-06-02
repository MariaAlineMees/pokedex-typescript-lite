import { TerminalController } from "./controllers/TerminalController.js";

async function main() {

    const controleDoTerminal = new TerminalController();
    await controleDoTerminal.iniciar();
}

main();