GitHub Issue Filter Saver
=========================

Description
-----------

The [new GitHub issues](https://github.com/blog/1866-the-new-github-issues) is awesome, but unfortunately issue filters are no longer preserved when clicking on the "issues" icon on the right navigation. This extension saves the last filter you used and loads that instead of a blank slate every time you access the main issues page.

This extension is open source. If you encounter any bugs, don't hesitate to make a pull request or [file an issue](https://github.com/dlo/github-issue-filter-safari/issues/new).

If you're looking for the Chrome version of this extension, head over [here](https://github.com/dlo/github-issue-filter-chrome-extension).

How it works
------------

GitHub issues relies pretty heavily on Javascript &amp; PJAX, and Safari's extension capabilities are a bit restricted as compared to Chrome's. So, here's what it does.

1. After page load, it goes through every link on the page and convert the target to a absolute URL and overrides the click handler to call a function.
2. When a link it clicked, the URL is matched to either a regular expression that indicates it's a filter that should be saved, or a link that should load the filter (i.e., https://github.com/username/repo/issues).
3. If it's a filter that should be saved, save it to the extension's Local Storage to a key created by combining the organization / username and repo name.
4. Last but not least, it uses MutationObserver to watch the page for DOM changes. When it's initiated, all new links on the page are replaced and overriden with the custom function. This happens when clicking on the "Labels" or "Assignee" dropdowns, since those are populated dynamically through an AJAX request.
