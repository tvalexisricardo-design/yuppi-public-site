const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Submits a FormData payload to Web3Forms, which emails the submission to
 * whichever address created the access key (see README for setup).
 *
 * Throws on network failure or a non-success response so callers can show
 * an error state.
 */
export async function submitForm(formData: FormData, subject: string) {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    // No key configured yet — surface a clear error instead of failing silently.
    throw new Error(
      "NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY não está definida. Ver README para configurar."
    );
  }

  formData.append("access_key", accessKey);
  formData.append("subject", subject);
  formData.append("from_name", "Website Yuppi");

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "Falha ao enviar o formulário.");
  }

  return result;
}
