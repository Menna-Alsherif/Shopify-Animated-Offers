import { Stack, Card, Page, Layout, Image } from "@shopify/polaris";
import { useRouter } from "next/router";
import { TitleBar } from "@shopify/app-bridge-react";
const NewOfferPage = () => {
  const router = useRouter();
  return (
    <Page
      fullWidth
      title="New Offer"
      subtitle="select an offer type to continue"
      breadcrumbs={[{ content: "Offers list", url: "/offer-list" }]}
    >
      <TitleBar title="New Offer" />
      <Layout>
        <Layout.Section oneHalf>
          <Card
            title="Popup offer"
            primaryFooterAction={{
              content: "Create popup offer",
              onAction() {
                router.push("/new-offer-wizard");
              },
            }}
          >
            <Card.Section>
              <Stack distribution="fillEvenly">
                <Image
                  width={600}
                  source="https://shopify.dev/assets/api/cross-sells/post-purchase-animation.gif"
                  alt="tbd"
                />
              </Stack>
            </Card.Section>
          </Card>
          <Card
            title="Banner offer"
            primaryFooterAction={{
              content: "Create banner offer",
              onAction() {
                router.push("/new-offer-wizard");
              },
            }}
          >
            <Card.Section>
              <Stack distribution="fillEvenly">
                <Image
                  width={600}
                  source="https://shopify.dev/assets/api/cross-sells/post-purchase-animation.gif"
                  alt="tbd"
                />
              </Stack>
            </Card.Section>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card
            title="Post purchase offer"
            primaryFooterAction={{
              content: "Create post purchase offer",
              onAction() {
                router.push("/new-offer-wizard");
              },
            }}
          >
            <Card.Section>
              <Stack distribution="fillEvenly">
                <Image
                  width={600}
                  source="https://shopify.dev/assets/api/cross-sells/post-purchase-animation.gif"
                  alt="tbd"
                />
              </Stack>
            </Card.Section>
          </Card>
          <Card
            title="Page embedded offer"
            primaryFooterAction={{
              content: "Create page embedded offer",
              onAction() {
                router.push("/new-offer-wizard");
              },
            }}
          >
            <Card.Section>
              <Stack distribution="fillEvenly">
                <Image
                  width={600}
                  source="https://shopify.dev/assets/api/cross-sells/post-purchase-animation.gif"
                  alt="tbd"
                />
              </Stack>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
export default NewOfferPage;
