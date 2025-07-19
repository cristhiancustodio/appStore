import { ExternalLink } from "@/components/ExternalLink";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function RegisterIA() {
    return (
        <ThemedView >
            <ThemedText type="title">Register IA</ThemedText>
            <ThemedText>This is the Register IA screen.</ThemedText>
            <ExternalLink href="https://docs.expo.dev/router/introduction">
                <ThemedText type="link">Learn more about routing</ThemedText>
            </ExternalLink>
        </ThemedView>
    );
}