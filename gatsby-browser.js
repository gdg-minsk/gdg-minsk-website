exports.onServiceWorkerUpdateReady = () => {
    const answer = window.confirm('This application has been updated. ' + 'Reload to display the latest version?');

    if (answer) {
        window.location.reload();
    }
};

exports.onRouteUpdate = () => {
    if (window.analytics) {
        window.analytics.page();
    }
};
