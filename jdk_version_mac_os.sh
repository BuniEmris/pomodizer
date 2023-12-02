  export JDK_VERSION_WANTED=11
  export JDK_VERSION_WANTED_FULL=11.0.14
  if [ "$(uname)" == "Darwin" ]; then
    echo "Uninstalling old JDK versions as needed. May generate up to 4 'Error' lines, they are safe to ignore."
    brew uninstall adoptopenjdk8 || true
    brew uninstall adoptopenjdk11 || true
    brew untap adoptopenjdk/openjdk || true
    brew untap AdoptOpenJDK/openjdk || true
    brew cleanup

    echo "Installing openjdk$JDK_VERSION_WANTED_FULL via brew on macOS"
    brew tap homebrew/cask-versions
    brew install --cask temurin$JDK_VERSION_WANTED
    if grep adoptopenjdk "$HOME/.bash_profile" > /dev/null 2>&1; then
      sed -i -e s'/adoptopenjdk/temurin/' "$HOME/.bash_profile"
      rm -f "$HOME/.bash_profile??"
    else
      # shellcheck disable=SC2129
      echo "# --- Add JAVA_HOME items" >> "$HOME/.bash_profile"
      echo "JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-$JDK_VERSION_WANTED.jdk/Contents/Home" >> "$HOME/.bash_profile"
      echo "export JAVA_HOME" >> "$HOME/.bash_profile"
      echo "PATH=\$JAVA_HOME/bin:\$PATH" >> "$HOME/.bash_profile"
      echo "export PATH" >> "$HOME/.bash_profile"
      echo "# --- End add JAVA_HOME items" >> "$HOME/.bash_profile"
    fi
    echo "!!! You will need to start a new Terminal session for $JDK_VERSION_WANTED to be in effect."
    echo "!!! Exit this Terminal, open a new one, and run doctor again..."
    exit 1
  else
    echo "You appear to not have openjdk full version $JDK_VERSION_WANTED_FULL installed, but it is required. Cannot proceed"
    exit 1
  fi