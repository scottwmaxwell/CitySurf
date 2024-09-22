function About({ modalOpen }: any) {
  return (
    <div className={"container main-content " + modalOpen}>
      <div className="row justify-content-center">
        <div className="col">
          <h3 className="header">About.</h3>

          <p>
            This site is something I made for School, but is also a personal
            project of mine. I'm hoping to continue to host this site so that
            it's easy to learn about new locations in the U.S.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
