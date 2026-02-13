/**
 * Create Page Form Block
 * Provides a form with a textbox for creating new pages
 */

import { generateContentWithOpenAI } from './openai-service.js';
import { generateContentWithOpenAIMock } from './openai-service.js';
import { getConfigValue } from '../../scripts/configs.js';

const USE_MOCK = await getConfigValue('USE_MOCK_OPENAI');
console.log('Using OpenAI Mock:', USE_MOCK);
export default function decorate(block) {
  const formContainer = document.createElement('div');
  formContainer.className = 'create-page-form-container';

  const form = document.createElement('form');
  form.className = 'create-page-form';

  const title = document.createElement('h2');
  title.className = 'create-page-form-title';
  title.textContent = 'Create New Page';

  // Create radio button group for content type
  const contentTypeFieldset = document.createElement('fieldset');
  contentTypeFieldset.className = 'create-page-form-fieldset';

  const contentTypeLegend = document.createElement('legend');
  contentTypeLegend.className = 'create-page-form-legend';
  contentTypeLegend.textContent = 'Content Type:';

  const radioContainer = document.createElement('div');
  radioContainer.className = 'create-page-form-radio-group';

  // Create radio buttons for image, text, both
  const contentTypes = [
    { value: 'image', label: 'Image' },
    { value: 'text', label: 'Text' },
    { value: 'both', label: 'Both' },
  ];

  contentTypes.forEach((type, index) => {
    const radioWrapper = document.createElement('div');
    radioWrapper.className = 'create-page-form-radio-wrapper';

    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.id = `content-type-${type.value}`;
    radioInput.name = 'contentType';
    radioInput.value = type.value;
    radioInput.className = 'create-page-form-radio-input';
    if (index === 0) {
      radioInput.checked = true; // Default to 'image'
    }

    const radioLabel = document.createElement('label');
    radioLabel.setAttribute('for', `content-type-${type.value}`);
    radioLabel.className = 'create-page-form-radio-label';
    radioLabel.textContent = type.label;

    radioWrapper.appendChild(radioInput);
    radioWrapper.appendChild(radioLabel);
    radioContainer.appendChild(radioWrapper);
  });

  contentTypeFieldset.appendChild(contentTypeLegend);
  contentTypeFieldset.appendChild(radioContainer);

  const contextLabel = document.createElement('label');
  contextLabel.className = 'create-page-form-label';
  contextLabel.textContent = 'Context (System Instructions):';
  contextLabel.setAttribute('for', 'context-content');

  const contextTextarea = document.createElement('textarea');
  contextTextarea.className = 'create-page-form-input';
  contextTextarea.id = 'context-content';
  contextTextarea.name = 'contextContent';
  contextTextarea.placeholder = 'Enter system instructions or context for the AI (e.g., "You are a helpful assistant that generates web page content...")';
  contextTextarea.rows = 3;
  contextTextarea.value = 'You are a helpful professional writer.';

  const label = document.createElement('label');
  label.className = 'create-page-form-label';
  label.textContent = 'Page Content:';
  label.setAttribute('for', 'page-content');

  const textarea = document.createElement('textarea');
  textarea.className = 'create-page-form-input';
  textarea.id = 'page-content';
  textarea.name = 'pageContent';
  textarea.placeholder = 'Enter a prompt...';
  textarea.rows = 6;
  textarea.required = true;

  const submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.className = 'create-page-form-submit';
  submitButton.textContent = 'Create Page';

  const resultContainer = document.createElement('div');
  resultContainer.className = 'create-page-form-result';
  resultContainer.style.display = 'none';

  // Create spinner element
  const spinner = document.createElement('div');
  spinner.className = 'create-page-form-spinner';
  spinner.style.display = 'none';

  form.appendChild(title);
  form.appendChild(contentTypeFieldset);
  form.appendChild(contextLabel);
  form.appendChild(contextTextarea);
  form.appendChild(label);
  form.appendChild(textarea);
  form.appendChild(submitButton);
  form.appendChild(resultContainer);

  submitButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const content = textarea.value.trim();
    const context = contextTextarea.value.trim();
    const contentType = form.querySelector('input[name="contentType"]:checked').value;

    if (!content) {
      return;
    }

    // Show loading state with spinner
    submitButton.disabled = true;
    submitButton.textContent = 'Creating...';
    resultContainer.style.display = 'block';
    resultContainer.innerHTML = '';
    resultContainer.appendChild(spinner.cloneNode(true));
    const loadingText = document.createTextNode('Processing your request...');
    resultContainer.appendChild(loadingText);
    resultContainer.className = 'create-page-form-result loading';

    try {
      let resultMessage = '';

      if (contentType === 'text') {
        // Make actual OpenAI API call for text content
        try {
          const generatedContent = await (USE_MOCK==="true"
            ? generateContentWithOpenAIMock(content, context)
            : generateContentWithOpenAI(content, context));
          resultMessage = `Generated content using OpenAI:\n\n${generatedContent}`;
        } catch (openaiError) {
          throw new Error(`Failed to generate content: ${openaiError.message}`);
        }
      } else {
        // For image and both options, use placeholder logic for now
        await new Promise((resolve) => {
          setTimeout(resolve, 1500);
        });
        resultMessage = `Page creation initiated with content type "${contentType}" and content: "${content.substring(0, 50)}${content.length > 50 ? '...' : ''}"`;
      }

      resultContainer.innerHTML = '';
      resultContainer.textContent = resultMessage;
      resultContainer.className = 'create-page-form-result success';
      textarea.value = '';
      contextTextarea.value = 'You are a helpful assistant that generates web page content based on user prompts. Generate engaging, well-structured content suitable for web pages.';
      // Reset radio buttons to default (image)
      form.querySelector('input[name="contentType"][value="image"]').checked = true;
    } catch (error) {
      resultContainer.innerHTML = '';
      resultContainer.textContent = `Error: ${error.message}`;
      resultContainer.className = 'create-page-form-result error';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Create Page';
    }
  });

  formContainer.appendChild(form);
  block.innerHTML = '';
  block.appendChild(formContainer);
}
