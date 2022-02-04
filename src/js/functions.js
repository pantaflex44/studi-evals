function wait(duration) {
    const t = Date.now();

    while (true) {
        if (Date.now() - t > duration) {
            return true;
        }
    }
}