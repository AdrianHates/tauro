interface Navbar {
  button: {
    name: string;
  };
  options: {
    name: string;
  }[];
}

interface History {
  title: string;
  description: {
    first: {
      first: string;
      second: string;
    };
    second: string;
  };
  clients: {
    description: string;
  };
  options: {
    name: string;
    description: string;
  }[];
}

interface Values {
  title: string;
  options: ValueOption[];
}

interface ValueOption {
  title: string;
  description: string;
  name: string;
}

interface AboutUs {
  title: {
    first: string;
    second: string;
  };
  history: History;
  values: Values;
}

interface Credits {
  title: string;
  options: {
    name: string;
    description: string;
  }[];
  notes: {
    title: string;
    description: string;
  };
}

interface Calculator {
  title: string[];
  form: {
    inputs: {
      name: string;
      excess: string;
      loading?: string;
      error?: string;
      ["input-notes"]?: string;
      calculatingString?: string;
    }[];
    button: {
      name: string;
    };
  };
}

interface Form {
  title: string;
  question: string;
  inputs: {
    [key: string]: {
      label: string;
      placeholder: string;
      voidString: string;
      restrictions: string;
    };
  };
  button: {
    name: string;
    loading: string;
    success: string;
    error: string;
  };
}

interface Footer {
  options: string[];
  address: string;
  phone: {
    name: string;
  };
}

interface Dictionary {
  navbar: Navbar;
  ["about-us"]: AboutUs;
  credits: Credits;
  calculator: Calculator;
  form: Form;
  footer: Footer;
}
