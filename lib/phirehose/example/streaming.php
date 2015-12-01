<?php
require_once('../lib/Phirehose.php');
require_once('../lib/OauthPhirehose.php');

/**
 * Example of using Phirehose to display a live filtered stream using track words
 */
class FilterTrackConsumer extends OauthPhirehose
{
  /**
   * Enqueue each status
   *
   * @param string $status
   */
  public function enqueueStatus($status)
  {
    /*
     * In this simple example, we will just display to STDOUT rather than enqueue.
     * NOTE: You should NOT be processing tweets at this point in a real application, instead they should be being
     *       enqueued and processed asyncronously from the collection process.
     */
    $data = json_decode($status, true);
    if (is_array($data) && isset($data['user']['screen_name'])) {
      print $data['user']['screen_name'] . ': ' . urldecode($data['text']) . "\n";
    }
  }
}

// The OAuth credentials you received when registering your app at Twitter
define("TWITTER_CONSUMER_KEY", "qdQGDb97sTCJIDKFAOkByxOBS");
define("TWITTER_CONSUMER_SECRET", "iX2xbmY3skcr8P3U3Xn9msVdU8FvOI5mqiNyPj4YFZbYDSH3q3");


// The OAuth data for the twitter account
define("OAUTH_TOKEN", "4292646147-wF79TR9fwfWsVv6Npue05cqvzp2oAmwEdZk8Sxd");
define("OAUTH_SECRET", "NbZ7R9E7BnlYWnZyJ4aVAFWg4Mg6WTZ9PgzaeLtdHZ51R");

// Start streaming
$sc = new FilterTrackConsumer(OAUTH_TOKEN, OAUTH_SECRET, Phirehose::METHOD_FILTER);
$sc->setTrack(array('iPhone', 'iPad', 'iPod', 'iOS'));
$sc->setLang("ja");
$sc->consume();
