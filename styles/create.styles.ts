import { COLORS } from "@/constants/Theme";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    contentContainer: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.surface,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: COLORS.white,
    },
    contentDisable: {
        opacity: 0.7,
    },
    shareButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        minWidth: 60,
        alignItems: "center",
        justifyContent: 'center',
    },
    shareButtonDisabled: {
        opacity: 0.5,
    },
    shareText: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.primary,
    },
    shareTextDisabled: {
        color: COLORS.grey,
    },
    emptyImageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
    },
    emptyImageText: {
        fontSize: 16,
        color: COLORS.grey,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    imageSection: {
        width: width,
        height: width,
        backgroundColor: COLORS.surface,
        justifyContent: "center",
        alignItems: "center",
    },
    previewImage: {
        width: "100%",
        height: "100%",
    },
    changeImageButton: {
        position: "absolute",
        bottom: 16,
        right: 16,
        padding: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    changeImageText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.white,
    },
    inputSection: {
        flex: 1,
        padding: 16,
    },
    captionContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    userAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 12,
    },
    captionInput: {
        flex: 1,
        fontSize: 16,
        color: COLORS.white,
        paddingTop: 8,
        minHeight: 40,
    },
})