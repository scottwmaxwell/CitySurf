declare module 'altcha' {
    const altcha: any;
    export default altcha;
  }

  declare namespace JSX {
    interface IntrinsicElements {
      'altcha-widget': {
        challengeurl: string;
      };
    }
  }