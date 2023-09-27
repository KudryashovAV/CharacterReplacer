describe("find minimal edit distance", () => {
  afterEach(() => {
    jest.resetModules();
  });

  test("for two equal by size words", () => {
    process.argv[2] = "wordone";
    process.argv[3] = "wordtwo";
    const log = jest.spyOn(console, "log").mockImplementation(() => {});

    const index = require("./index");
    expect(log).toHaveBeenCalledTimes(5);
    expect(log).toHaveBeenNthCalledWith(1, 3);
    expect(log).toHaveBeenNthCalledWith(2, "wordtwo");
    expect(log).toHaveBeenNthCalledWith(3, "wordtwe");
    expect(log).toHaveBeenNthCalledWith(4, "wordtne");
    expect(log).toHaveBeenNthCalledWith(5, "wordone");

    log.mockReset();
  });

  test("for short and long words", () => {
    process.argv[2] = "hell";
    process.argv[3] = "paradise";
    const log = jest.spyOn(console, "log").mockImplementation(() => {});

    require("./index");

    expect(log).toHaveBeenCalledTimes(10);

    expect(log).toHaveBeenNthCalledWith(1, 8);
    expect(log).toHaveBeenNthCalledWith(2, "paradise");
    expect(log).toHaveBeenNthCalledWith(3, "paradisl");
    expect(log).toHaveBeenNthCalledWith(4, "paradill");
    expect(log).toHaveBeenNthCalledWith(5, "paradell");
    expect(log).toHaveBeenNthCalledWith(6, "parahell");
    expect(log).toHaveBeenNthCalledWith(7, "parhell");
    expect(log).toHaveBeenNthCalledWith(8, "pahell");
    expect(log).toHaveBeenNthCalledWith(9, "phell");
    expect(log).toHaveBeenNthCalledWith(10, "hell");

    log.mockReset();
  });

  test("for words with uppercase characters", () => {
    process.argv[2] = "Wordone";
    process.argv[3] = "woRdtwo";
    const log = jest.spyOn(console, "log").mockImplementation(() => {});
    require("./index")

    expect(log).toHaveBeenCalledTimes(7)
    expect(log).toHaveBeenNthCalledWith(1, 5);
    expect(log).toHaveBeenNthCalledWith(2, "woRdtwo");
    expect(log).toHaveBeenNthCalledWith(3, "woRdtwe");
    expect(log).toHaveBeenNthCalledWith(4, "woRdtne");
    expect(log).toHaveBeenNthCalledWith(5, "woRdone");
    expect(log).toHaveBeenNthCalledWith(6, "wordone");
    expect(log).toHaveBeenNthCalledWith(7, "Wordone");


    log.mockReset();
  });

  // I think, that it is incorrect behavior and I provided solution in index.ts:26
  test("for long and short words", () => {
    process.argv[2] = "paradise";
    process.argv[3] = "hell";
    const log = jest.spyOn(console, "log").mockImplementation(() => {});
    require("./index");

    expect(log).toHaveBeenCalledTimes(10);

    expect(log).toHaveBeenNthCalledWith(1, 8);
    expect(log).toHaveBeenNthCalledWith(2, "hell");
    expect(log).toHaveBeenNthCalledWith(3, "hele");
    expect(log).toHaveBeenNthCalledWith(4, "hese");
    expect(log).toHaveBeenNthCalledWith(5, "hise");
    expect(log).toHaveBeenNthCalledWith(6, "dise");
    expect(log).toHaveBeenNthCalledWith(7, "dise");
    expect(log).toHaveBeenNthCalledWith(8, "dise");
    expect(log).toHaveBeenNthCalledWith(9, "dise");
    expect(log).toHaveBeenNthCalledWith(10, "dise");

    log.mockReset();
  });

  // this test for line index.ts:26 line. Uncomment it, when line will be uncomment in the script.
  // test("for long and short words", () => {
  //   process.argv[2] = "paradise";
  //   process.argv[3] = "hell";
  //   const log = jest.spyOn(console, "log").mockImplementation(() => {});
  //   require("./index");
  //
  //   expect(log).toHaveBeenCalledTimes(10);
  //
  //   expect(log).toHaveBeenNthCalledWith(1, 8);
  //   expect(log).toHaveBeenNthCalledWith(2, "hell");
  //   expect(log).toHaveBeenNthCalledWith(3, "hele");
  //   expect(log).toHaveBeenNthCalledWith(4, "hese");
  //   expect(log).toHaveBeenNthCalledWith(5, "hise");
  //   expect(log).toHaveBeenNthCalledWith(6, "dise");
  //   expect(log).toHaveBeenNthCalledWith(7, "adise");
  //   expect(log).toHaveBeenNthCalledWith(8, "radise");
  //   expect(log).toHaveBeenNthCalledWith(9, "aradise");
  //   expect(log).toHaveBeenNthCalledWith(10, "paradise");
  //
  //   log.mockReset();
  // });
});
