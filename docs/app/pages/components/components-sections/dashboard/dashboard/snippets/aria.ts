class Component {
    getChangeSuccessAnnouncement(widget: DashboardWidgetComponent, differences: DashboardLayoutDiff[]): string {
        // map the differences to strings
        const differenceStrings = differences.map((diff) => {
            const changes: string[] = [];

            // Handle movement strings
            if (diff.isMovedHorizontally && diff.isMovedVertically) {
                changes.push(`moved to row ${diff.currentRow}, column ${diff.currentColumn}`);
            } else if (diff.isMovedDown) {
                changes.push(`moved down to row ${diff.currentRow}, column ${diff.currentColumn}`);
            } else if (diff.isMovedUp) {
                changes.push(`moved up to row ${diff.currentRow}, column ${diff.currentColumn}`);
            } else if (diff.isMovedLeft) {
                changes.push(`moved left to row ${diff.currentRow}, column ${diff.currentColumn}`);
            } else if (diff.isMovedRight) {
                changes.push(`moved right to row ${diff.currentRow}, column ${diff.currentColumn}`);
            }

            // handle resize strings
            if (diff.isResized) {
                changes.push(`resized to ${diff.currentColumnSpan} columns wide and ${diff.currentRowSpan} rows high`);
            }

            return `${diff.widget.name} panel is ${changes.join(' and ')}.`;
        });

        return `${differenceStrings.join(
            ' '
        )} Use the cursor keys to continue moving and resizing, enter to commit, or escape to cancel.`;
    }
}
