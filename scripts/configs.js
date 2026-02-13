const getConfigForEnvironment = async () => {
  try {
    const configJSON = window.sessionStorage.getItem('config');
    if (!configJSON) {
      throw new Error('No config in session storage');
    }

    const parsedConfig = JSON.parse(configJSON);
    if (!parsedConfig[':expiry'] || parsedConfig[':expiry'] < Math.round(Date.now() / 1000)) {
      throw new Error('Config expired');
    }

    return parsedConfig;
  } catch (e) {
    const fileName = 'configs.json';
    const configURL = new URL(`${window.location.origin}/${fileName}`);
    let configJSON = await fetch(configURL);
    if (!configJSON.ok) {
      throw new Error('Failed to fetch config');
    }
    configJSON = await configJSON.json();
    configJSON[':expiry'] = Math.round(Date.now() / 1000) + 7200;
    window.sessionStorage.setItem('config', JSON.stringify(configJSON));
    return configJSON;
  }
};

/**
* This function retrieves a configuration value for a given environment.
*
* @param {string} configParam - The configuration parameter to retrieve.
* @param {string} [environment] - Optional, overwrite the current environment.
* @returns {Promise<string|undefined>} - The value of the configuration parameter, or undefined.
*/
export const getConfigValue = async (configParam) => {
  const config = await getConfigForEnvironment();
  const configElements = config.data;
  return configElements.find((c) => c.key === configParam)?.value;
};

export const getCookie = (cookieName) => {
  const cookies = document.cookie.split(';');
  let foundValue;

  cookies.forEach((cookie) => {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      foundValue = decodeURIComponent(value);
    }
  });

  return foundValue;
};

export const checkIsAuthenticated = () => !!getCookie('auth_dropin_user_token') ?? false;
