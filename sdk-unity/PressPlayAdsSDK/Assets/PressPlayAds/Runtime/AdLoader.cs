using UnityEngine;
using UnityEngine.Networking;
using System.Collections;

namespace PressPlayAds
{
    public class AdLoader : MonoBehaviour
    {
        [Tooltip("Material to display the ad")]
        public Renderer adRenderer;

        [Tooltip("Fallback texture if ad fails")]
        public Texture2D fallbackTexture;

        [Tooltip("Placement ID for the ad call")]
        public string placementId = "demo_billboard";

        private const string adServerUrl = "https://your-api.test/v1/ad";

        void Start()
        {
            StartCoroutine(FetchAd());
        }

        IEnumerator FetchAd()
        {
            string url = $"{adServerUrl}?placementId={placementId}";

            using (UnityWebRequest req = UnityWebRequestTexture.GetTexture(url))
            {
                yield return req.SendWebRequest();

                if (req.result == UnityWebRequest.Result.Success)
                {
                    Texture2D tex = DownloadHandlerTexture.GetContent(req);
                    adRenderer.material.mainTexture = tex;
                }
                else
                {
                    Debug.LogWarning($"Ad load failed: {req.error}");
                    if (fallbackTexture != null)
                        adRenderer.material.mainTexture = fallbackTexture;
                }
            }
        }
    }
}
