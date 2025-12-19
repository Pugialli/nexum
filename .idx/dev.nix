{ pkgs, ... }: {
  # Which packages (tools) should be installed in your environment
  packages = [
    pkgs.nodejs_20
  ];

  # Environment variables
  env = {};

  idx = {
    # Search for the extensions you want in the IDE
    extensions = [
      "vscode-edge-devtools.vscode-edge-devtools"
    ];

    # Workspace lifecycle hooks
    workspace = {
      onCreate = {
        # Open the terminal and install packages automatically
        npm-install = "npm install";
      };
    };

    # Preview configuration
    previews = {
      enable = true;
      previews = {
        web = {
          # This command must match the 'dev' script in your package.json
          command = ["npm" "run" "dev"];
          manager = "web";
          env = {
            PORT = "9002";
          };
        };
      };
    };
  };
}