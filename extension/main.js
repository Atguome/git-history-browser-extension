const urlProvider = document.URL.split('/');
switch (urlProvider[2]) {
  case 'github.com':
    this.isButtonInsertedGithub(document.URL);
    let oldUrl = document.URL;
    // It's necessary because git use pjax to refresh views
    // https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes#46428962
    window.onload = () => {
      let bodyList = document.querySelector('body');
      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (oldUrl != document.URL) {
            if (isButtonInsertedGithub(document.URL)) {
              oldUrl = document.URL;
            }
          }
        });
      });

      let config = {
        childList: true,
        subtree: true
      };
      observer.observe(bodyList, config);
    };
    break;
  case 'bitbucket.org':
    break;
  case 'gitlab.com':
    this.isButtonInsertedGitlab(document.URL);
    break;
  default:
    break;
}

function isButtonInsertedGitlab(url) {
  if (
    /https:\/\/gitlab\.com\/[a-zA-Z0-9-_\.]*\/[a-zA-Z0-9-_\.]*\/blob\/.*/.test(url)
  ) {
    const auxUrl = url.split('/');
    auxUrl[2] = 'gitlab.githistory.xyz';
    url = auxUrl.join('/');
    const buttonGitHistory = document.createElement('a');
    buttonGitHistory.innerHTML = 'Open in Git History';
    buttonGitHistory.setAttribute('class', 'btn btn-default btn-sm');
    buttonGitHistory.setAttribute('href', url);
    try {
      document
        .getElementsByClassName('file-actions')[0]
        .childNodes[3].appendChild(buttonGitHistory);
      return true;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
}

function isButtonInsertedGithub(url) {
  if (
    /https:\/\/github\.com\/[a-zA-Z0-9-_\.]*\/[a-zA-Z0-9-_\.]*\/blob\/.*/.test(url)
  ) {
    const auxUrl = url.split('/');
    auxUrl[2] = 'github.githistory.xyz';
    url = auxUrl.join('/');
    const buttonGithubHistory = document.createElement('a');
    buttonGithubHistory.innerHTML = 'Open in Git History';
    buttonGithubHistory.setAttribute('class', 'btn btn-sm BtnGroup-item');
    buttonGithubHistory.setAttribute('href', url);
    try {
      document
        .getElementById('raw-url')
        .parentNode.appendChild(buttonGithubHistory);
      return true;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
}
